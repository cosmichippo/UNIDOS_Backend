
import React from "react";
import SimpleMap from "./SimpleMap";
import './App.css'
import foo from '../sensors.json' with {type: 'geojson'};

function App() {
  return (
    <div>
      <div className="Explanation">
        <h4 className="test">Tract-Based Sensor Density Visualization</h4>
        This map highlights the disparate gaps in <a href='https://map.purpleair.com/air-quality-standards-us-epa-aqi?opt=%2F1%2Flp%2Fa10%2Fp604800%2FcC0#7.77/36.504/-121.205'>PurpleAir</a> sensor access between 
        communities within Santa Cruz, Monterey, and San Benito counties. 
        This concern is particularly important because of the amount of farmwork that is done in the salinas valley, 
        an area which is overwhelmingly
        unaccounted for. 
        The dataset for this map comprises of sensors active in 2025. 

      </div>
      <SimpleMap mapData={foo}/>
    </div>
  );
}

export default App;