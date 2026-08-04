import { useMap, useMapEvent, Circle } from "react-leaflet";
import { useState } from "react";
import { circle } from "leaflet";
import {getSensorData} from "./api"
// Ok i should write a function that colors the circle apropriately based on context
// how will that be handled? can the circle 



async function onclick(e){
    const id = e.target.options.sensorId;
    //const test = await getSensorData(id);
    e.target.options.setMyLayer(id);
    // just set the 
    // onclick -> check sensor 
}

function CircleController(props){
    const map = useMap();  
    const [circleSize, setCircleSize] = useState(map.getZoom() * 100);
    useMapEvent('zoom', ()=> {
        const zoomLevel = map.getZoom();
        if (zoomLevel > 12) {
        setCircleSize(50)
        } else {
        setCircleSize(1000)
        }
    })
    //onclick doesn't work? or am i just doing this wrong. 
    return (<Circle {...props} radius={circleSize} eventHandlers={{click: (props) => {onclick(props)}}} />)
}
export default CircleController;