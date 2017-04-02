import { SimulationService, SimulationParams } from './simulation.service';

import {
  expect
} from 'chai';

import 'jasmine';

import * as _ from 'lodash';

describe("Simulation tests", () => {

    let sim = new SimulationService();

    beforeAll(()=>{
        let simParams = <SimulationParams> {
            iterations: 1000,
            sprintLength: 10
        };

        sim.setup(simParams);
    });

    it("Should run 1000 simulations", () => {
        let result = sim.runTT(
            [1,0,2,5,0,0,1],
            7,
            20);
        expect(result.length === 1000);
    });

    it("Average should be 100", () => {
        let result = sim.runTT(
            [5,5,5,5,5,5],
            7,
            20);
        let avg = result.reduce((x,y) => x + y) / result.length; 
        expect(avg).to.eq(100);
    });

    it("Average should be 80", () => {
        let result = sim.runTT(
            [4,4,4,4,4,4,4,4,4],
            7,
            20);
        let avg = result.reduce((x,y) => x + y) / result.length; 
        expect(avg).to.eq(80);
    });
});
