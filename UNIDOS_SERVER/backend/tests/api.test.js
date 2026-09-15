import {it, describe, expect} from 'vitest'
import { extractAverage } from "../api";

describe('extract average', ()=>{
    it('should work', () => {
        expect(1 == 1)
    });
    it('should not return null with two objects', () => {
        const a = {'test': 12};
        const b = {'test': 12};
        const ls = [a, b];
        expect(extractAverage(ls, 'test', (a, b) => {a + b})).not.toBe(null)
    });``
    it('should sum two objects', () => {
        const a = {'test': 12};
        const b = {'test': 12};
        const ls = [a, b];
        expect(extractAverage(ls, 'test', 
            (accumulator, currVal) => {return accumulator + currVal})
        ).toBe(12)
    });
    it("throws error if not every element has key", ()=> {
        const foo = [{'test': 12}, {'test': 12},{'rest': 12}];
        expect(()=>extractAverage(foo, 'test', (a, b)=> a+b)).toThrow("each object doesn't contain this");
    });
    it('can deal with strings when passed', () =>{
        const foo = [{'test': "12"}, {'test': "12"}];
        const val = extractAverage(foo, 'test', (a, b)=> {return Number(a) + Number(b)})
        expect(val).toBe(12);
    });
    it('can deal with sample data', () => {
        const sampleData =        [
{"locationId":183709,"locationName":"116 Friend Street, Kettleman City O3.1","locationType":"outdoor","latitude":36.00780694061686,"longitude":-119.9583014751845,"pm01":1.1,"pm02":2.9,"pm10":3.3,"pm01_corrected":1.1,"pm02_corrected":11.6,"pm10_corrected":3.3,"pm003Count":609,"atmp":45.5,"rhum":18,"rco2":422,"atmp_corrected":45.5,"rhum_corrected":18,"rco2_corrected":422,"wifi":-75,"timestamp":"2026-08-21T23:54:04.000Z","serialno":"588c813594c0","model":"O-M-1PPST-CE","firmwareVersion":null,"tvoc":null,"tvocIndex":34353,"noxIndex":17178,"batteryVoltage":"9.80","panelVoltage":"16.92"},
{"locationId":183644,"locationName":"3rd Street Kettleman City, K3.1","locationType":"outdoor","latitude":36.00879278454084,"longitude":-119.96551761620744,"pm01":2.2,"pm02":4.5,"pm10":4.6,"pm01_corrected":2.2,"pm02_corrected":7.3,"pm10_corrected":4.6,"pm003Count":429,"atmp":26.4,"rhum":50,"rco2":504,"atmp_corrected":26.4,"rhum_corrected":50,"rco2_corrected":504,"wifi":-73,"timestamp":"2026-08-18T08:20:28.000Z","serialno":"588c8135a228","model":"O-M-1PPST-CE","firmwareVersion":null,"tvoc":null,"tvocIndex":34317,"noxIndex":19090,"batteryVoltage":"8.85","panelVoltage":"0.00"},
{"locationId":183644,"locationName":"3rd Street Kettleman City, K3.1","locationType":"outdoor","latitude":36.00879278454084,"longitude":-119.96551761620744,"pm01":2.2,"pm02":4.5,"pm10":4.6,"pm01_corrected":2.2,"pm02_corrected":7.3,"pm10_corrected":4.6,"pm003Count":429,"atmp":26.4,"rhum":50,"rco2":504,"atmp_corrected":26.4,"rhum_corrected":50,"rco2_corrected":504,"wifi":-73,"timestamp":"2026-08-18T08:20:28.000Z","serialno":"588c8135a228","model":"O-M-1PPST-CE","firmwareVersion":null,"tvoc":null,"tvocIndex":34317,"noxIndex":19090,"batteryVoltage":"8.85","panelVoltage":"0.00"},
{"locationId":183644,"locationName":"3rd Street Kettleman City, K3.1","locationType":"outdoor","latitude":36.00879278454084,"longitude":-119.96551761620744,"pm01":2.2,"pm02":4.5,"pm10":4.6,"pm01_corrected":2.2,"pm02_corrected":7.3,"pm10_corrected":4.6,"pm003Count":429,"atmp":26.4,"rhum":50,"rco2":504,"atmp_corrected":26.4,"rhum_corrected":50,"rco2_corrected":504,"wifi":-73,"timestamp":"2026-08-18T08:20:28.000Z","serialno":"588c8135a228","model":"O-M-1PPST-CE","firmwareVersion":null,"tvoc":null,"tvocIndex":34317,"noxIndex":19090,"batteryVoltage":"8.85","panelVoltage":"0.00"},
]; 
       const label = 'pm02';
       const val = extractAverage(sampleData, label, (a, b) => a + b); 
       expect(val).not.toBeNull();
       expect(val).not.toBeNaN();
       expect(val).toBeTruthy();
    });
})
