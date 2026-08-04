import {setupServer} from 'msw/node'
import {http, HttpResponse} from 'msw'
import arrOfSensorData from "./sensitiveInfo.json" with {type: 'json'}

export const handlers = [
    http.get('localhost:8000/all', ()=> {
        return HttpResponse.json(arrOfSensorData);
    }),
];


export const server = setupServer(...handlers);
