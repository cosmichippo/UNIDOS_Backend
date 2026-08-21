import axios from "axios";
import "dotenv/config.js";

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
        const val = body.find((e)=> e.id === id);
        return val;
    }).catch((err)=>{
        console.error(err);
    });
    return val;
}

const fbPagePost = async(id, message, token) => {
    const endpoint = `https://graph.facebook.com/v26.0/${id}/feed`;
    const headers = {
        "access_token": token,
    };
    const val = await axios.post(endpoint, {"message":"another1 :D"}, {
        params: headers,
        timeout: 5000, // 5 seconds
        transitional: {
            // set to true if you prefer ETIMEDOUT over ECONNABORTED
            clarifyTimeoutError: true,
        }
    }).catch((err) => {
        console.error(err.status)
        console.error(err)
    });
    return val;
}

export {fbPagePost, fbGetTokenForID}