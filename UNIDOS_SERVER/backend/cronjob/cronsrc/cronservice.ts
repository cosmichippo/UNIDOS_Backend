import { extractAverage, getId } from './utils/airgrad.js';
import { fbGetTokenForID, fbPagePost, fbUpdatePagePost } from './utils/fb.js';
import { CommentMetaData, getQueueHead, addToQueue} from './utils/io.js';
import type {Dict} from './utils/constants.js'
import type {Measure, Measurement} from './utils/AirGradientInterface.js'
import type {AxiosResponse} from "axios"
import { access } from 'node:fs';
import { Post } from 'facebook-nodejs-business-sdk';



interface messageData {
    comment: string
}

interface postData {
    prevPost: CommentMetaData | null;
    currData: Measure[];
    message: messageData;
    nextFn: (id: string, message: string, token: string)=> Promise<AxiosResponse<any, any, {}, any>>; 
}

function formatMessage(avgVal:number, threshold:number, pollutionType:string, englishOrSpanish:boolean, region:string) {
    //return avgVal
    if (!region) {
        region = 'Kings County'
    }
    const english_text =  
    `The average sensor reading for ${region} is detected to be ${avgVal}, of ${pollutionType} which we consider to be unhealthy`;
    const spanish_text =
    `nuestros sensores en la region de ${region} reportan un promedio de ${avgVal} de ${pollutionType}, mas de ${threshold}, que consideramos insaludables`;
    return (englishOrSpanish) ? english_text: spanish_text;

    
}

const scheduledFunction = async (ids:Array<string>, dataType: keyof Measurement, thresholds:Dict<number>) => {
    if (!ids) {return null}
    if (!(dataType in thresholds)) {return null} 
    const threshold = thresholds[dataType];
    const idFileName = "./queue.json";

    const pageId = process.env.FB_PAGE_ID;
    const sysUserToken = process.env.FACEBOOK_SYSTEM_USER_TOKEN;
    if (pageId === undefined || sysUserToken === undefined) throw Error("Not able to access valid tokens")

    const promises: Promise<Measure | null>[] = ids.map(getId);
    /**
     * decision time --> measure can return null values.
     * how do i structure flow of code to allow for diagnosing this issue +
     * this should be important right? We don't want null values.
     * */

    const averageValue = await Promise.all(promises).then((val_arr: (Measure | null)[] )=>{
            // process values
            // if they're valid,
            // then get set of nums
            // for each value in the array, look at its contents, and return a specific measurement. 
            val_arr.map((e: (Measure | null)) => {
                if (e == null) {
                    throw Error("Not supposed to be null, deal with this later")
                }
            })

            return val_arr as Measure[]            
    }).then((val_arr)=>{
        // moment of reflection - how can i set this up to avoid casting ?
        return extractAverage(val_arr, dataType as any, (a, b)=> {return(a as number) + (b as number)}, 0);
    })
    
    if (averageValue === undefined) {
        return 1;
    }

    try{
        // determining what to post
        // if avgVal is bigger than what you want
        // if id is null or overloaded
        // post update
        // else new post
        const prevPostData : CommentMetaData | null = await getQueueHead(idFileName);
        let msg: messageData = {comment: "nothing"};
        if (averageValue > threshold) {
            msg.comment = formatMessage(averageValue, threshold, dataType, true, "kings");     
        }
        try {
            // making post
            const fbOut = await fbGetTokenForID(pageId, sysUserToken);
            if (fbOut === undefined) {
                throw Error ("returned Undefined")
            } 
            const accessToken = fbOut?.access_token;
            if (prevPostData && prevPostData.id && prevPostData.updatecount < 24) {
                const res = await fbUpdatePagePost(prevPostData.id, {message: msg.comment, link: "https://www.gogle.com/"}, accessToken);
                // update prevPostData
                prevPostData.updatecount += 1;
                await addToQueue(idFileName, prevPostData)
            } else {
                const res = await fbPagePost(pageId, {message: msg.comment}, accessToken);
                const PostData: CommentMetaData = {id: res.data.id, time: "idk", updatecount: 0};
                await addToQueue(idFileName, PostData);
            } 
            return 0;
        }
        catch (err: any) {
            console.error(err.message);
            
            return 2
        }
        
    } catch (err: unknown) {
        //console.error()
        return -1
    }

}

export default scheduledFunction;