import React, { useEffect, useState,} from "react";
import L from 'leaflet';
import { MapContainer, TileLayer, GeoJSON} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import HoverLegend from "./HoverLegend";

const SimpleMap = ({mapData}) => {
  // const mapRef = useRef(null);
  // const latitude = 36.508017; 
  // const longitude = -121.442490;
  //36.0884013,-119.881286
  const MAP_DEFAULTS = {center: [36.088401, -119.881286], zoom: 12}
  const [myLayer, setMyLayer] = useState(null);



  const updateMyLayer = (info) => {
    setMyLayer(info);
    console.log(info);
  };


  const highlightFeature = (feature, layer)=> {
      layer.on({
        mouseover: (e) => {
          e.target.setStyle({
            fillOpacity: 0.7,
            weight: 2,
          });
        },
        mouseout: (e) => {
          e.target.setStyle({
            fillOpacity: 0.5,
            weight: 1,
          });
        },
        click: (e) => {
          // Handle click events, e.g., zoom to feature
          updateMyLayer(feature);
        }
      })
  }
  
  // log : 1 - 10, 2 100, 3, 1000
  const stylefunction = (feature)=> {

    let legendcolor = "#00ff00";
    
    return {color: legendcolor, fillOpacity: 0.5};
  }
 

  return ( 
      <MapContainer center={MAP_DEFAULTS.center}
                    zoom={MAP_DEFAULTS.zoom} 
                    scrollWheelZoom={true} 
                    style={{height: "80vh", width: "100vw"}}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mapData && <GeoJSON data={mapData} style={stylefunction} onEachFeature={highlightFeature}/>}
        <HoverLegend state={myLayer} position={"bottomright"}/>
        
      </MapContainer>
  );
};

export default SimpleMap;