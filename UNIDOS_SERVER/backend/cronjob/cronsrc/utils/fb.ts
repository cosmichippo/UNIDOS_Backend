import axios, { AxiosResponse } from "axios";
//import "dotenv/config.js";
// how can i use  facebook api? 
import * as fb from "facebook-nodejs-business-sdk";


interface PageResponseInterface {
    id: string,
    access_token: string
}

interface messageparams {
    link?: string,
    message: string

}

/**
 * currently gotta work on making this work with the facebook business sdk
 *  @param {string} pageId
 *  @param {string} token
 */
const fbGetData = async (pageId: string, token:string) =>{
     
    const ServerEvent  = fb.ServerEvent;
    const EventRequest = fb.EventRequest;
    const UserData     = fb.UserData;
    const CustomData   = fb.CustomData;

    //feed valid access token
    const api = fb.FacebookAdsApi.init(token);
    fb.Page
    // challenge rn - figuring out how to make a request to get page token, 
    // as documented here: https://github.com/facebook/facebook-nodejs-business-sdk/tree/main#access-token

}

/**
 * 
 * @param {string} id 
 * @param {string} token 
 * @returns object with access_token for page
 */
const fbGetTokenForID = async(id:string, token:string) => {
    const fbEndpoint = "https://graph.facebook.com/v26.0/me/accounts";
    const headers = {
        "access_token": token,
    };
    const val = await axios.get(fbEndpoint, {
        params: headers,
        timeout: 5000, // 5 seconds
        transitional: {
            // set to true if you prefer ETIMEDOUT over ECONNABORTED
            clarifyTimeoutError: true,
        },
    }).then((res) => {
        // axios res always has "data"
        // fb has 'data' in javascript as well
        const body = res.data.data as PageResponseInterface[];
        
        // could probably make it so that ways this returns the first thing if id is not provided
        // this grabs from facebook api
        const val = body.find((e: PageResponseInterface)=> e.id === id);
        
        return val;
    }).catch((err)=>{
        console.error(err);
    })
    return val;
}

/**
 * 
 * @param {string} postId 
 * @param {string} message 
 * @param {string} token 
 * @returns post response object
 */
// at some point, switch to meta business sdk
// it has support for pages api
// for today, just update post


const fbUpdatePagePost = async(page_post_id: string, data: messageparams, token:string): Promise<AxiosResponse<any, any, {}, any>> => {
    const endpoint = `https://graph.facebook.com/v26.0/${page_post_id}`;
    const headers = {
        "access_token": token,
    };
    const val = await axios.post(endpoint, data, {
        params: headers,
        timeout: 5000, // 5 seconds
        transitional: {
            // set to true if you prefer ETIMEDOUT over ECONNABORTED
            clarifyTimeoutError: true,
        }
    }).catch((err) => {
        console.error(err.status);
        console.error(err);
        return err
    });
    return val;
}

/**
 * 
 * @param {string} id 
 * @param {messageparams} data 
 * @param {string} token 
 * @returns post response object
 */

const fbPagePost = async(id:string, data:messageparams, token:string): Promise<AxiosResponse<any, any, {}, any>> => {
    const endpoint = `https://graph.facebook.com/v26.0/${id}/feed`;
    const headers = {
        "access_token": token,
    };
    const val = await axios.post(endpoint, data, {
        params: headers,
        timeout: 5000, // 5 seconds
        transitional: {
            // set to true if you prefer ETIMEDOUT over ECONNABORTED
            clarifyTimeoutError: true,
        }
    }).catch((err) => {
        console.error(err.status)
        console.error(err)
        return err
    });
    return val;
}




export {fbPagePost, fbGetTokenForID, fbUpdatePagePost};