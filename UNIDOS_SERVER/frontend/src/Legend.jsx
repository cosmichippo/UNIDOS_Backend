import { useEffect, useState, useRef} from "react";
import L from "leaflet";
import './HoverLegend.css'


export function Legend({sensorId, sensorArr}){

    const sensor = sensorArr?.find((e)=> e.locationId === sensorId);
    return (
    <div
    style={{
      position: 'absolute',
      width: 500,
      height: 200,
      bottom: "0%",
      right: "0%",
      zIndex: 10000,
      backgroundColor:"white"
    }}
  >
        <h4 className="legend">AQI</h4>
        <p className="legend">{sensor ? sensor.pm02 : "Click to load"}</p>
    </div>)
}