import 'dotenv/config.js';
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import { fbPagePost, fbGetTokenForID} from './fb.js';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors()); // Allow frontend access
// app.use(oas-tools) # ADD YAML FILE FOR CORRECT PARSING OF DATA

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

app.get("/fbEndpoint", async (req, res) => {
    const id = process.env.FB_PAGE_ID // this won't change... but fahhh so ugly
    const sys_token = process.env.FACEBOOK_SYSTEM_USER_TOKEN;
    const message = "Hi";
    try{
        const val = await fbGetTokenForID(id, sys_token);
        const currId = val.id;
        const token = val.access_token;
        const out = await fbPagePost(currId, message, token);
        res.status(out.status).json(out.data);
    }
    catch{
        console.error("didnt' work")
        res.send(500);
    }
})

app.get('/all', async (req, res) => {
    const ids = ["183709", "183644", "171892", "171872", "171871", "171897", "171882"];
    const promises = ids.map(getId);
    const val = await Promise.all(promises);
    return res.send(val);
});

// Route to get air quality by city

app.get('/air-quality/:id', async (req, res) => {
    // here we want to add to this by incorporating like storage which contains this info
    const ids = ["183709", "183644", "171892", "171872", "171871", "171897", "171882"];
    try {
        const locationId = req.params.id;
        // this has to be better
        if (!(ids.includes(locationId))){
            console.log("doesn't include id")
            throw 500;
        }
        const apiKey = process.env.AQI_API_KEY;
        const headers = {'token': apiKey};
        const response = await axios.get(`https://api.airgradient.com/public/api/v1/locations/${locationId}/measures/current`, 
           {params: headers}
        );

        return res.status(response.status).json(response.data);
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

export {app};