/**
 * this is where i'll keep the simple api script to fetch shit from backend
 */
const URI = "http://localhost:3000/air-quality/"
const URI_ALL = "http://localhost:3000/all"
/**
 * 
 * UNIMPLEMENTED returns sensors that you have access to 
 * @param {*} screenCoordinates
 * @returns UNIMPLEMENTED json array of all sensors you can see
 */
export async function getVisibleSensors(screenCoordinates){
    const promise = await fetch(URI_ALL)
                    .then((res)=> res.json())
                    .catch((err)=> {return null});
    return promise;
}

/**
 *
 * @param {string} sensorId
 * @returns
 */
export async function getSensorData(sensorId){
    const reqParams = {
        headers: {
            "id": sensorId
        }
    }

    const promise = await fetch(URI, reqParams)
                    .then((res)=> res.body)
                    .catch((err)=> {return null});
    return promise;
}


//export {getSensorData, getVisibleSensors};