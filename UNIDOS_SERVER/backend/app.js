require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow frontend access
// app.use(oas-tools) # ADD YAML FILE FOR CORRECT PARSING OF DATA

const PORT = process.env.PORT || 3000;

// Route to get air quality by city
app.get('/air-quality', async (req, res) => {
    try {
        const city = req.params.city;
        // this has to be better
        const apiKey = process.env.AQI_API_KEY;
        
        // Example using WAQI API structure
        const response = await axios.get(`${process.env.AQI_BASE_URL}${city}/?token=${apiKey}`);
        
        // Return the data to your frontend
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch air quality data' });
    }
});

module.exports(app);

