
import React from "react";
import SimpleMap from "./SimpleMap";
import './App.css'
import foo from '../sensors.json' with {type: 'geojson'};

function App() {
  return (
    <div>
      <div className="Explanation">
        <h4 className="test"></h4>
      </div>
      <SimpleMap mapData={foo}/>
    </div>
  );
}

export default App;