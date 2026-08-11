import { useEffect, useState, useRef} from "react";
import L from "leaflet";
import './HoverLegend.css'
import { useMap } from "react-leaflet";

/** 
 * Defunct, now using Legend. Keeping as reference
 * 
 * 
 * */ 
export function HoverLegend({state, sensors, position}) { 
    const map = useMap();
    // hoverLegend is onclick updates 
    const [airQuality, setAirQuality] = useState(null);
    const infoRef = useRef(null);
    
    useEffect(()=>{
    // this is called whenever state, or sensors updates
    if (state != null && sensors != null){
        const sensor = sensors.find((e)=> e.locationId === state);
        console.log(sensor);
        // this is redundant, since sensors is just air quality
        // how can i structure this to return a better component?
        setAirQuality(sensor);
    }
    }, [state, sensors])
    
    
    useEffect(()=> 
        {
        console.log("update effect used")
        // adds 
        const info = L.control({ position: position });
        info.onAdd = function () {
            this._div = L.DomUtil.create("div", "info legend");
            this.update(airQuality)
            return this._div;
        };
        
        info.update = function (data) {
            if (!data){
                this._div.innerHTML = `<h4 class ="legend">AQI</h4> <p>Loading</p><br><h4>Location</h4><p>Loading</p>`; 
                return;
            }
            
            const val = data ? data.pm02 : (airQuality ? airQuality.pm02 : "Loading");
            const loc = data.locationName;
            this._div.innerHTML = `<h4 class ="legend">AQI</h4> <p>${val}</p><br><h4>Location</h4><p>${loc}</p>`;
        }
        info.addTo(map);
        infoRef.current = info;

        return () => {
            info.remove();
            infoRef.current = null;

        };
    },[map, airQuality, position]);
    
    useEffect(() => {
        if (infoRef.current) {
            infoRef.current.update(airQuality);
        }
    }, [airQuality]);    
}