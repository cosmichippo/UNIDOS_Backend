const app       = require('../app.js');
const jest      = require('jest');
const request = require('supertest');


it('first test', async done=>{
    const res = await request.get('/')
    done();
});