import {it, expect} from "vitest"
import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './mocks/server';
import { getSensorData } from "../src/api";
// Establish API mocking before all tests.
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());


it("should return something", async ()=>{
    const data = await getSensorData("fakeSensorId");
    expect(data).toBeDefined();
});


