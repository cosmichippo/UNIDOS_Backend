import {vi, test, expect, beforeAll, afterEach, afterAll, expectTypeOf} from 'vitest'
import {getId, validate} from '../api';
import  scheduledFunction from '../cronservice'
import { THRESHOLDS } from '../constants';
import {http, HttpResponse} from 'msw'
import {setupServer} from 'msw/node';



const sensorTestOut = {"locationId":183709,"locationName":"kmcity","locationType":"outdoor",
    "latitude":36.00780694061686,"longitude":-119.9583014751845,"pm01":7.2,"pm02":1,"pm10":22.2,"pm01_corrected":7.2,
    "pm02_corrected":15.9,"pm10_corrected":22.2,"pm003Count":834,"atmp":32.8,"rhum":33,"rco2":433,"atmp_corrected":32.8,
    "rhum_corrected":33,"rco2_corrected":433,"wifi":-71,"timestamp":"2026-08-27T04:00:12.000Z","model":"O-M-1PPST-CE",
    "firmwareVersion":null,"tvoc":null,"tvocIndex":34667,"noxIndex":17357,"batteryVoltage":"10.23","panelVoltage":"0.00"};

    // ok i remember now that the issue i was having, was that the httpresponse was returning a object with 'data'
const handlers = [
    http.get("https://api.airgradient.com/public/api/v1/locations/:id+", ({params}) => {
        return HttpResponse.json({"data":sensorTestOut});
    })
]

const server = setupServer(...handlers);
beforeAll(async ()=>{
    
    server.listen()

});
afterEach(async ()=>{
    server.resetHandlers();

});
afterAll(() =>{
    server.close();
})

test('mock getId', async()=>{
    //const ids = ["183709", "183644", "171892", "171872", "171871", "171897", "171882"];
    const id = "183709"//, "183644", "171892"];
    const out = await getId(id);
    expect(out).toBeTruthy()
    // this is a janky test
    expect('data' in out).toBeTruthy()
    // ok so now we know that this is a type error that is being thrown. we don't want that. the error is being thrown at 106, because //expect(axios.get).toHaveBeenCalledTimes(2);

})

test('tests no error thrown', async ()=> {
    const ids = ["183709", "183644"];
    const out = await scheduledFunction(ids,'pm02', {'pm02': 1})
    expect(out).not.toBeInstanceOf(Error);
})

test('tests scheduleFunction returns avg value', async ()=> {
    const ids = ["183709", "183644"];
    const out = await scheduledFunction(ids,'pm02', {'pm02': 1})
    if (!(typeof(out) === 'number')) {
        throw Error(`${typeof(out)}`)
    }
})

test('tests scheduleFunction returns correct value', async ()=> {
  server.use(
    http.get("https://api.airgradient.com/public/api/v1/locations/183644/measures/current", ({params}) => {
      return HttpResponse.json({ data: {'pm02': 2} });
    })
  );
  server.use(
    http.get("https://api.airgradient.com/public/api/v1/locations/183709/measures/current", ({params}) => {
      return HttpResponse.json({ data: {'pm02': 4} });
    })
  );
    const ids = ["183709", "183644"];
    const out = await scheduledFunction(ids,'pm02', {'pm02': 1})
    if (out != 3) {
        throw Error (`value is in fact ${out}`)
    }
})