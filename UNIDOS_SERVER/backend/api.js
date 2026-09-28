import axios from "axios";
import env from 'dotenv/config';
//import "dotenv/config.js";
/**
 * 
 * @param {string} id 
 * @param {string} token 
 * @returns object with access_token for page
 */
const fbGetTokenForID = async(id, token) => {
    //test
    
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
        const body = res.data.data;
        // could probably make it so that ways this returns the first thing if id is not provided
        const val = body.find((e)=> e.id === id);
        return val;
    }).catch((err)=>{
        console.error(err);
    });
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

const fbUpdatePagePost = async(page_post_id, message, token) => {
    const endpoint = `https://graph.facebook.com/v26.0/${page_post_id}`;
    const headers = {
        "access_token": token,
    };
    const val = await axios.post(endpoint, {"message":message}, {
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
 * @param {string} message 
 * @param {string} token 
 * @returns post response object
 */

const fbPagePost = async(id, message, token) => {
    const endpoint = `https://graph.facebook.com/v26.0/${id}/feed`;
    const headers = {
        "access_token": token,
    };
    const val = await axios.post(endpoint, {"message":message}, {
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



/**
 * @callback avgParams
 * @param {number} first first element
 * @param {number} second next element, 
 * @returns {number} combines both guys
 */
/**
 * typechecks and grabs avg
 * @param {Array<object>} data 
 * @param {string} dataId 
 * @param {avgParams} callbackfn function takes 2 inputs returns 1
 * @returns {number}
 */

const extractAverage = (data, dataId,callback, iv) => { 
    if (!data.length) // if empty
    {throw Error("empty")}
    else if (!data) {
        throw Error("empty array - potentially redundant")
    } else if(!data.every((e) => dataId in e))
     {throw Error("each object doesn't contain this")};
    // extract data
    const vals = data.map((e)=> e[dataId]);
    // get mean NOTE: 
    if (iv) return vals.reduce(callback, iv) / data.length;``
    return vals.reduce(callback) / data.length
};

const getId = async (id)=> {
    const ids = ["183709", "183644", "171892", "171872", "171871", "171897", "171882"];
    try {
        // this has to be better
        if (!(ids.includes(id))){
            console.log("doesn't include id")
            throw 500;
        }
        const apiKey = process.env.AQI_API_KEY;
        const headers = {'token': apiKey};
        const response = await axios.get(`https://api.airgradient.com/public/api/v1/locations/${id}/measures/current`, 
           { params:headers }
        );
        return response.data;
    } catch (error) {
        console.log(error);
        // kind of horrible way of doing this i think, mixing up object with numbers. 
        // should have a response object i can return, instead of having to muddy up with 
        // different types
        return error; //(axios.HttpStatusCode.InternalServerError);
    }
};

const cronJob = async() => {
    /*  things to look out for:
        there are multiple things i might want to look out for, 
        also, there might be transforms i want to do w the data
        ok for now..
        simple: 

    */  
    
    //  get data from app.get(all)
    //  get subset for kettleman
    //  get subset for stratford
    //  
    //  verify that data is above a threshold
    //  
    //  if valid:
    //      message = formatMessage(data, dataType)
    //      fbPagePost(id);
    //      fbPagePost(message)
    //  }
};

export {fbPagePost, fbGetTokenForID, extractAverage, getId, fbUpdatePagePost};