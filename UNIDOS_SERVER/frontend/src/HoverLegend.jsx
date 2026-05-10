import { useEffect, useState, useRef} from "react";
import L from "leaflet";
import './HoverLegend.css'
import { useMap } from "react-leaflet";

function HoverLegend({state, position}) { 
    const map = useMap();
    // all that's happening here is HoverLegend is populating div with info from State
    // this should be where the effect takes place, not the simpleMap, since you want things to be independent of each other. 
    // since you would hypothetically be passing in the state.
    // now, what this means is that 

    const [airQuality, setAirQuality] = useState(null);
    const infoRef = useRef(null);
    //if (state == null) return;
    // here we update using 
    useEffect(() => {
        
        console.log("downloadEffect used");
        if (!state?.properties.sensorId) return;
        console.log("conditional logic reached");
        const id = state.properties.sensorId;
        fetch(`http://localhost:3000/air-quality/${id}`)
        .then(response=> response.json())
        .then(data => {setAirQuality(data); console.log(data)})
        .catch(err => console.error(err));

    }, [state]);

    useEffect(()=>{
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
