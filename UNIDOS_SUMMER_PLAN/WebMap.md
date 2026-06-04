UnAnswered Questions:
* determine whether or not I can use Server-less or require a server for UNIDOS Website. 
	* serverless vs dedicated server benefits:
* What Service Will I use? 
* Service to ensure webscraping / malicious actors aren't spamming my backend.
* Determine how to host rest of UNIDOS website for a low price. 
Backend
* ShitTODO:
	* Add endpoint for getting info for all sensors.
	* Add postGRES caching. 
	* Add API request to TARTA monitors. 
	* Add endpoint for downloading data from sensor
	* Add CRON job that regularly makes requests to Sensors, updates POSTGRES. 
	* Add Facebook pushing in CRON Job. 
Frontend
* Tasks for frontend
	* write unit tests / E2E tests.
	* reformat to use react-leaflet context. 
	* add clickable icon that lets you download data, display data.
	* query all sensors cached data on startup, so sensors are visualized properly.
	* make sensor nodes proportional. 
	* maybe don't make sensors static, make it so that info is downloaded first.
