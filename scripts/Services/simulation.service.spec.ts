import { Simulation, SimulationParams } from './simulation.service';

import {
  expect
} from 'chai';

describe("Simulation tests", () => {

    let sim = new Simulation();

    beforeAll(()=>{
        let simParams = <SimulationParams> {
            iterations: 1000,
            sprintLength: 10
        };

        sim.setup(simParams);
    });

    it("", () => {
        let result = sim.runTT(
            [1,0,2,5,0,0,1],
            7,
            20);
        expect(result.length === 1000);
    });
});
