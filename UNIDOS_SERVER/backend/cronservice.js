import axios from 'axios';
import env from 'dotenv/config';

import { extractAverage, fbGetTokenForID, fbPagePost, getId} from './api.js';


const validate = (data, dataId, thresholds) => {
    //return true;
    // thresholds will be a data structure that determines 
    // i kinda hate this but i dont want to bite the bullet and write all this again in TS with types
    // but i will.. after today :D just want to get this up and running
    if (!(dataId in data)){
        throw Error(`DataId not in Data ${dataId}, ${data}`)
    }
    else if (!(dataId in thresholds)){
        throw Error("DataId not in Thresholds");
    }

    const val = data[dataId];
    const thresh = thresholds[dataId];
    // this is throwing because data is an array not a 

    if (val > thresh) { return true};
    return false;
};

function formatMessage (avgVal, threshold, id, englishOrSpanish, region) {
    //return avgVal
    if (!region) {
        region = 'Kings County'
    }
    const english_text =  
    `The average sensor reading for ${region} is detected to be ${avgVal}, which we consider to be unhealthy`;
    const spanish_text =
    `nuestros sensores en la region de ${region} reportan un promedio de ${avgVal} de ${id}, mas de ${threshold}, que consideramos insaludables`;
    return (englishOrSpanish) ? english_text: spanish_text;

    
}

const scheduledFunction = async (ids, dataType, thresholds) => {
    if (!ids) {return null}
    if (!dataType in thresholds) {return null}

    const promises = ids.map(getId);
    try {
    const averageValue = await Promise.all(promises).then((val_arr)=>{
        try{
            for (const val of val_arr) {
                const valid = validate(val, dataType, thresholds)
            }
            return val_arr
        } catch{
            // this is hacky.
            for (const val of val_arr) {
                const data = val.data;
                // this is also hacky, validate throws error if it doesn't work.
                const valid = validate(data, dataType, thresholds)
            }

            const test =  val_arr.map((val)=> val.data);
            if (!test){
                throw Error("breaks here");
            }
            return test;
        } 
    }).then((val_arr)=>{
       return extractAverage(val_arr, dataType, (a, b)=> {return a + b}, 0);
    }) 
    const threshold = thresholds[dataType];
    if (averageValue > threshold) {
        const pageId = process.env.FB_PAGE_ID;
        const sysUserToken = process.env.FACEBOOK_SYSTEM_USER_TOKEN 
        const fbOut = await fbGetTokenForID(pageId, sysUserToken);
        const accessToken = fbOut.access_token;
        // this is all boilerplate stuff to get the token to post for
        if (!accessToken) {
            throw Error("no access token")
        }

        const message = formatMessage(averageValue, threshold, dataType, false);

        const out = await fbPagePost(pageId, 
            JSON.stringify(message), accessToken);
        return averageValue;
    }
    throw Error(`Value ${averageValue} greater than threshold of ${threshold}`)
} catch(err) {
    throw Error(err.message);
}
}


export default scheduledFunction;