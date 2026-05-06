require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow frontend access
// app.use(oas-tools) # ADD YAML FILE FOR CORRECT PARSING OF DATA

const PORT = process.env.PORT || 3000;

// Route to get air quality by city
app.get('/air-quality/:id', async (req, res) => {
    //Kman Ids
    ids = ["183709", "183644", "171892", "171872"]
    try {
        const locationId = req.params.id;
        // this has to be better
        if (!(ids.includes(locationId))){
            console.log("doesn't include id")
            throw 500;
        }
        const apiKey = process.env.AQI_API_KEY;
        const headers = {token: apiKey};
        const response = await axios.get(`https://api.airgradient.com/public/locations/${locationId}/measures/current`, 
           { headers }
        );
        if (response.headers == 200) {
            res.json(response.data)
        } else {
            res.status(response.headers).send();
            console.log(response);
        }
        //res.json(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    } 
    // i should read up on express responses, chaning responses, good practices for code. 
    // I don't like that there are multiple locations where this code can terminate from.
    // I would like this to be better organized to be expandable.
});

module.exports = {app};

