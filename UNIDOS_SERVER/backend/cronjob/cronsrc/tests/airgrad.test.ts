import {it, describe, expect, beforeAll, afterEach, afterAll} from 'vitest'
import { Measure, Measurement} from '../utils/AirGradientInterface';
import { extractAverage, getId } from "../utils/airgrad";

import {http, HttpResponse} from 'msw';
import {setupServer} from 'msw/node';

describe('extract average', ()=>{
    it('should work', () => {
        expect(1 == 1)
    });
    it('should not return null with two objects', () => {
        const a : Measure= {pm02: 12};
        const b : Measure= {pm02: 12};
        const ls = [a, b];
        expect(extractAverage(ls, 'pm02', (a, b) => a + b, 0)).not.toBe(null)
    });
    it('should sum two objects', () => {
        const a : Measure= {pm02: 12};
        const b : Measure= {pm02: 12};
        const ls = [a, b];
        expect(extractAverage(ls, 'pm02', 
            (accumulator, currVal) => {return accumulator + currVal})
        ).toBe(12)
    });
    it("throws error if not every element has key", ()=> {
        const foo : Measure[] = [{pm02: 12}, {pm02: 12}];
        const key = 'pm01';
        expect(()=>extractAverage(foo, key, (a, b)=> a+b, 0)).toThrow(`each object doesn't contain ${key}`);
    });
    it('can deal with strings when passed', () =>{

        const foo : Measure[] = [{pm02: 12}, {pm02: 12}];
        const val = extractAverage(foo, 'pm02', (a, b)=> {return Number(a) + Number(b)}, 0)
        expect(val).toBe(12);
    });
    it('can deal with sample data', () => {
        const sampleData : Measure[]=        [
{"locationId":183709,"locationName":"","locationType":"outdoor","latitude":36.00780694061686,"longitude":-119.9583014751845,"pm01":1.1,"pm02":2.9,"pm10":3.3,"pm01_corrected":1.1,"pm02_corrected":11.6,"pm10_corrected":3.3,"pm003Count":609,"atmp":45.5,"rhum":18,"rco2":422,"atmp_corrected":45.5,"rhum_corrected":18,"rco2_corrected":422,"wifi":-75,"timestamp":"2026-08-21T23:54:04.000Z","serialno":"588c813594c0","model":"O-M-1PPST-CE","firmwareVersion":null,"tvoc":null,"tvocIndex":34353,"noxIndex":17178,"batteryVoltage":"9.80","panelVoltage":"16.92"},
{"locationId":183644,"locationName":"","locationType":"outdoor","latitude":36.00879278454084,"longitude":-119.96551761620744,"pm01":2.2,"pm02":4.5,"pm10":4.6,"pm01_corrected":2.2,"pm02_corrected":7.3,"pm10_corrected":4.6,"pm003Count":429,"atmp":26.4,"rhum":50,"rco2":504,"atmp_corrected":26.4,"rhum_corrected":50,"rco2_corrected":504,"wifi":-73,"timestamp":"2026-08-18T08:20:28.000Z","serialno":"588c8135a228","model":"O-M-1PPST-CE","firmwareVersion":null,"tvoc":null,"tvocIndex":34317,"noxIndex":19090,"batteryVoltage":"8.85","panelVoltage":"0.00"},
{"locationId":183644,"locationName":"","locationType":"outdoor","latitude":36.00879278454084,"longitude":-119.96551761620744,"pm01":2.2,"pm02":4.5,"pm10":4.6,"pm01_corrected":2.2,"pm02_corrected":7.3,"pm10_corrected":4.6,"pm003Count":429,"atmp":26.4,"rhum":50,"rco2":504,"atmp_corrected":26.4,"rhum_corrected":50,"rco2_corrected":504,"wifi":-73,"timestamp":"2026-08-18T08:20:28.000Z","serialno":"588c8135a228","model":"O-M-1PPST-CE","firmwareVersion":null,"tvoc":null,"tvocIndex":34317,"noxIndex":19090,"batteryVoltage":"8.85","panelVoltage":"0.00"},
{"locationId":183644,"locationName":"","locationType":"outdoor","latitude":36.00879278454084,"longitude":-119.96551761620744,"pm01":2.2,"pm02":4.5,"pm10":4.6,"pm01_corrected":2.2,"pm02_corrected":7.3,"pm10_corrected":4.6,"pm003Count":429,"atmp":26.4,"rhum":50,"rco2":504,"atmp_corrected":26.4,"rhum_corrected":50,"rco2_corrected":504,"wifi":-73,"timestamp":"2026-08-18T08:20:28.000Z","serialno":"588c8135a228","model":"O-M-1PPST-CE","firmwareVersion":null,"tvoc":null,"tvocIndex":34317,"noxIndex":19090,"batteryVoltage":"8.85","panelVoltage":"0.00"},
]; 
       const label = 'pm02';
       const val = extractAverage(sampleData, label, (a, b) => a + b, 0); 
       expect(val).not.toBeNull();
       expect(val).not.toBeNaN();
       expect(val).toBeTruthy();
    });
})



const sensorTestOut = {"locationId":183709,"locationName":"kmcity","locationType":"outdoor",
        "latitude":36.00780694061686,"longitude":-119.9583014751845,"pm01":7.2,"pm02":1,"pm10":22.2,"pm01_corrected":7.2, "pm02_corrected":15.9,"pm10_corrected":22.2,"pm003Count":834,"atmp":32.8,"rhum":33,"rco2":433,"atmp_corrected":32.8,
        "rhum_corrected":33,"rco2_corrected":433,"wifi":-71,"timestamp":"2026-08-27T04:00:12.000Z","model":"O-M-1PPST-CE",
        "firmwareVersion":null,"tvoc":null,"tvocIndex":34667,"noxIndex":17357,"batteryVoltage":"10.23","panelVoltage":"0.00"};
const handlers = [
    http.get("https://api.airgradient.com/public/api/v1/locations/:id+", ({params}) => {
        return HttpResponse.json(sensorTestOut);
    })];

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

describe('getId', ()=>{
    it("should return type Measure", async ()=>{
        const out = await getId("183709")
        expect(out).toBeDefined();
        expect(out).toHaveProperty('pm02')
    })
})