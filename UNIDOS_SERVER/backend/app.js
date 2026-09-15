import 'dotenv/config.js';
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import { fbPagePost, fbGetTokenForID, getId} from './api.js';
import scheduledFunction from './cronservice.js';
import { THRESHOLDS } from './constants.js';
// this is gonna break cause i'm mixing require with import. fix later
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors()); // Allow frontend access
// app.use(oas-tools) # ADD YAML FILE FOR CORRECT PARSING OF DATA



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


app.get('/fullPath/:type', async (req, res)=> {
    if (!(req.params.type in THRESHOLDS)) {
        return res.status(500).send("Inappropriate property")
    }
    const type = req.params.type;
    const ids = ["183709", "183644", "171892"];

    const out = await scheduledFunction(ids, type, THRESHOLDS);
    console.log('out', out)
    if (out === null || out === undefined) {
        return res.status(500).send()
    }
    return res.status(200).send(); 
})

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