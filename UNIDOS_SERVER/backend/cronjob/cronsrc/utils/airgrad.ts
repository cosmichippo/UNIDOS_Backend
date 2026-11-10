
import get, { AxiosError } from 'axios'; 
import { Measure, Measurement, Measures} from './AirGradientInterface' 

const getId = async (id:string): Promise<Measure>=> {
    const ids = ["183709", "183644", "171892", "171872", "171871", "171897", "171882"];

    const apiKey = process.env.AQI_API_KEY;
    const headers = {'token': apiKey};
    const link = `https://api.airgradient.com/public/api/v1/locations/${id}/measures/current`

    // this has to be better
    if (!(ids.includes(id))){
        console.log("doesn't include id")
        throw 500;
    }
    
    const response = await get<Measure>(link, 
        { params:headers }
    );
    return response.data;
    // unsafe, can throw error
};

/**
 * typechecks and grabs avg
 * @param {Array<object>} data 
 * @param {} dataId 
 * @param {avgParams} callback function takes 2 inputs returns 1
 * @returns {number}
 */

const extractAverage = (data:Measure[], dataId:keyof Measurement , callback:(curr: number, prev: number )=> number, iv:number = -1): number => { 
    if (!data.length) // if empty
    {throw Error("empty")}
    else if (!data) {
        throw Error("empty array - potentially redundant")
    } else if(!data.every((e:Measure) => dataId in e))
     {throw Error(`each object doesn't contain ${dataId}`)};
    // extract data
    if (callback == undefined) throw Error("callback not defined");

    const vals = data.map((e:Measure)=> { 
        if (typeof e[dataId] ==='number') {
            return e[dataId] as number
        } else return -1;
    });
    // this is a hacky way of verifying that the thingy is empty
    const flag = vals.find((e) => e == -1);
    if (flag == -1) {
        throw Error(`Not every element element in array has value ${String(dataId)}`)
    }
    /**
     * extract average should only ever have to do exactly that. 
     * i should force all values into an array, and then assert that the array is non-negative ( which i do )
     */
    if (iv !== -1 && vals !== undefined) return vals.reduce(callback, iv) / data.length;
    return vals.reduce(callback) / data.length

    
};

export {getId, extractAverage}