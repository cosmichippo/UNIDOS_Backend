import React, { useCallback, useEffect, useState,} from "react";
import L from 'leaflet';
import { MapContainer, TileLayer, GeoJSON, Circle, useMap, useMapEvent} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import CircleController from "./CircleController";
import { getVisibleSensors } from "./api";
import { useQuery } from "@tanstack/react-query";
import { Legend } from "./Legend";
import { HoverLegend} from "./HoverLegend"

const SimpleMap = () => {
  // const mapRef = useRef(null);
  // const latitude = 36.508017; 
  // const longitude = -121.442490;
  //36.0884013,-119.881286
  const MAP_DEFAULTS = {center: [36.088401, -119.881286], zoom: 12}
  const [myLayer, setMyLayer] = useState(null); 

//should this be a custom hook so that ways the simplemap is "pure"? i think so..
// try to get this to work then see whats up
  // recall that this format {} is a destructor, so you're grabbing objects by their name
  const {data, isSuccess, error} = useQuery({ 
    queryKey: ["sensors"],
    queryFn: async () =>{return getVisibleSensors()}
  });
  // i need to figure out how i'm going to update data within the center thingy to be proportional
  // i need a recap on how data in react is rendered. i believe this is rendered every frame?

  if (isSuccess) {
    return ( 
      <MapContainer center={MAP_DEFAULTS.center}
                    zoom={MAP_DEFAULTS.zoom} 
                    scrollWheelZoom={true} 
                    style={{height: "80vh", width: "100vw"}}
                    role="myMap"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data?.map((sensor, index) => {
            const sensorOptions = {
              center:[sensor.latitude, sensor.longitude],
              color:"green",
              sensorId: sensor.locationId,
              setMyLayer: setMyLayer};
            return (<CircleController{...sensorOptions} key={sensor.locationId}/>)
        })}
        <Legend sensorId={myLayer} sensorArr={data}/>
      </MapContainer>
      ); 
    } 
  return (
      <MapContainer center={MAP_DEFAULTS.center}
                    zoom={MAP_DEFAULTS.zoom} 
                    scrollWheelZoom={true} 
                    style={{height: "80vh", width: "100vw"}}
                    role="myMap"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
  
      </MapContainer>
  );
};

export default SimpleMap;