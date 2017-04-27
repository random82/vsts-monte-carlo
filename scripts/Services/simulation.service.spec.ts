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

    describe("simulation result", () => {
        let result : number[][];
        let noSimulations = 5;
        let noWorkItems = 3;

        beforeAll(() => {
            let taktTimeSamples = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2];            
            result = sim.run(taktTimeSamples, noWorkItems, noSimulations);
        });

        it("Should have number of rows equal to work items count", ()=>{
           expect(result).to.have.lengthOf(noWorkItems);
        });

        it("Should have number of columns equal to simulation runs", ()=>{
            expect(result.every(row => row.length === noSimulations)).to.be.true;
        });

        it("Should summarise takt time in each column", ()=>{
            let expected = [
                [2, 2, 2, 2, 2],
                [4, 4, 4, 4, 4],
                [6, 6, 6, 6, 6]
            ];

            expect(result).to.be.eql(expected);
        });
    });

    describe("sprint simulation", () => {
        let simulatedTaktTimes : [
                [6, 3, 4, 3, 3],
                [8, 5, 7, 5, 10],
                [12, 10, 14, 9, 10],
                [14, 16, 16, 11, 13]
            ];
        let result : number[][];
        let sprintLengths = [5, 4, 5, 5]

        beforeAll(() => {
            result = sim.runSprintSimulations(simulatedTaktTimes, sprintLengths)
        });

        it("Should have number of rows equal to work items simulations count", () => {
           expect(result).to.have.lengthOf(simulatedTaktTimes.length);
        });

        it("Should have number of columns equal to sprint count", () => {
            expect(result.every(row => row.length === sprintLengths.length)).to.be.true;
        });

        it("Should have done-probabilities in each cell", () => {
            let expected = [
                // 4 out of 5 simulations are less than 5 days, all of them are eq/less than 9 days
                [0.8, 1.0, 1.0, 1.0], 
                // 2 out of two samples are less than 5 days, 4 out of 5 are eq/less than 9 days                
                [0.4, 0.8, 1.0, 1.0],
                [0.0, 0.2, 1.0, 1.0],
                [0.0, 0.0, 0.6, 1.0]
            ];
            expect(result).to.be.eql(expect);
        });
    });
});
