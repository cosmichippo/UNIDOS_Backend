import { useEffect, useState, useRef} from "react";
import L from "leaflet";
import './HoverLegend.css'
import { useMap } from "react-leaflet";

function HoverLegend({state, sensors, position}) { 
    const map = useMap();
    // hoverLegend is onclick updates 
    const [airQuality, setAirQuality] = useState(null);
    const infoRef = useRef(null);
    //if (state == null) return;
    // instead of updating state from /air-quality endpoint, we will for now set it from the "state" variable
    /*
    useEffect(() => {
        if (!state?.properties?.sensorId) return;
        const id = state.properties.sensorId;
        // maybe change to store not as a property but info that's stored in state?
        fetch(`http://localhost:3000/air-quality/${id}`)
        .then(response=> response.json())
        .then(data => {setAirQuality(data); console.log(data)})
        .catch(err => console.error(err));

    }, [state]);
    */
    
    //setAirQuality(state)
    useEffect(()=>{

    if (state != null && sensors != null){
        const sensor = sensors.find((e)=> e.locationId === state);
        console.log(sensor);
        setAirQuality(sensor);
    }
    }, [state, sensors])
    
    
    useEffect(()=> 
        {
        console.log("update effect used")
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
            
            const val = data ? data.pm10 : (airQuality ? airQuality.pm10 : "Loading");
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

export default HoverLegend;
