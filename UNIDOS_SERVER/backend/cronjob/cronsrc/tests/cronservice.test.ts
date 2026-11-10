import {vi, test, expect, beforeAll, afterEach, afterAll, expectTypeOf} from 'vitest'
import {getId} from "../utils/airgrad";
import  scheduledFunction from '../cronservice'
import {http, HttpResponse} from 'msw'
import {setupServer} from 'msw/node';
import { loadEnvFile } from "node:process";

const sensorTestOut = {"locationId":183709,"locationName":"kmcity","locationType":"outdoor",
    "latitude":36.00780694061686,"longitude":-119.9583014751845,"pm01":7.2,"pm02":1,"pm10":22.2,"pm01_corrected":7.2,
    "pm02_corrected":15.9,"pm10_corrected":22.2,"pm003Count":834,"atmp":32.8,"rhum":33,"rco2":433,"atmp_corrected":32.8,
    "rhum_corrected":33,"rco2_corrected":433,"wifi":-71,"timestamp":"2026-08-27T04:00:12.000Z","model":"O-M-1PPST-CE",
    "firmwareVersion":null,"tvoc":null,"tvocIndex":34667,"noxIndex":17357,"batteryVoltage":"10.23","panelVoltage":"0.00"};


    // ok i remember now that the issue i was having, was that the httpresponse was returning a object with 'data'

const fakePageId = "FAKEPAGEID"
const fakePostId = "FAKEPOSTID"
const fakeToken = "FAKETOKEN"
const handlers = [
    http.get("https://api.airgradient.com/public/api/v1/locations/:id+", ({request, params}) => {
        if (request.url.includes("183709") ) {
            return HttpResponse.json({"locationId": 183709, "pm02": 1});
        } else if (request.url.includes("183644")) {
            return HttpResponse.json({"locationId": 183644, "pm02": 1});
        } else{
            console.log(request.url)
            return HttpResponse.json({status: 400});
        }
        
    }),
    http.get("https://graph.facebook.com/v26.0/me/accounts", ({params})=>{
        return HttpResponse.json({'data':
            [{'id': fakePageId, 'access_token':fakeToken}]
        });
    }),

    http.post(`https://graph.facebook.com/v26.0/:${fakePageId}+`, ({request})=>{
        return HttpResponse.json({'data':
            {'id': fakePostId}
        });
    }),
    http.post(`https://graph.facebook.com/v26.0/${fakePageId}/feed`, ({params})=>{
        return HttpResponse.json({'data':
            {'id': fakePostId}
        });
    })
];



const server = setupServer(...handlers);
beforeAll(async ()=>{
    const envPath = "./.mockEnv"
    loadEnvFile(envPath) 
    server.listen()

});
afterEach(async ()=>{
    server.resetHandlers();

});
afterAll(() =>{
    server.close();
})

test('mock getId', async()=>{
    const id = "183709"//, "183644", "171892"];
    const out = await getId(id);
    expect(out).toBeTruthy()
    // this is a janky test
    expect(out).toHaveProperty("pm02");
    expect(out)

    // issue: still need to test 
})

test('tests no error thrown', async ()=> {
    const ids = ["183709", "183644"];
    let errflip  = 0
    try{

    const out = await scheduledFunction(ids,'pm02', {'pm02': 0.5})
    expect(out).not.toBeInstanceOf(Error);
    }
    catch(err) {
       errflip = 1 
    }
    expect(errflip).toBe(0);
    
})

test('tests if guy works', async ()=> {

    let errflip  = 0
    try{
    const ids = ["183709", "183644"];
    const out = await scheduledFunction(ids,'pm02', {'pm02': 0.5})
    }
    catch(err: any) {
    console.error(err.message);
       errflip = 1 
    }
    expect(errflip).toBe(0);
})

test('tests if spy runs', async ()=> {
    let errflip = 0
        const ids = ["183709", "183644"];
        const out1 = await scheduledFunction(ids,'pm02', {'pm02': 0.5})
        expect(out1).toBe(0);
        const out2 = await scheduledFunction(ids,'pm02', {'pm02': 0.5})
        expect(out2).toBe(0);
    
})
/*
test('tests scheduleFunction returns avg value', async ()=> {
    const ids = ["183709", "183644"];
    const out = await scheduledFunction(ids,"pm02", {'pm02': 0.5})
    if (!(typeof(out) === 'number')) {
        throw Error(`${typeof(out)}`)
    }
})

test('tests scheduleFunction returns correct value', async ()=> {
  server.use(
    http.get("https://api.airgradient.com/public/api/v1/locations/183644/measures/current", ({params}) => {
      return HttpResponse.json({'pm02': 2 });
    })
  );
  server.use(
    http.get("https://api.airgradient.com/public/api/v1/locations/183709/measures/current", ({params}) => {
      return HttpResponse.json({'pm02': 4});
    })
  );
    const ids = ["183709", "183644"];
    const out = await scheduledFunction(ids,'pm02', {'pm02': 1})
    if (out != 3) {
        throw Error (`value is in fact ${out}`)
    }
})
    */