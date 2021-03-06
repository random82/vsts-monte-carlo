
export interface SimulationParams {
    iterations:number;
    sprintLength:number;
}

import {
    Injectable
} from '@angular/core';

Injectable();
export class SimulationService {

    private params: SimulationParams;

    setup(params: SimulationParams) {
        this.params = params;
    };

    runTT(sampleSet : number[], noSprints : number, noItems : number) : number[] {
        let results: number[] = [];
        for(let i = 0; i < this.params.iterations; i++) {
            let total = 0;
            for(let s = 0; s < noItems; s++) {
                let id = Math.floor(Math.random() * sampleSet.length);
                total += sampleSet[id];
            }
            results.push(total);
        }

        return results;
    }

    run(taktTimeSample : number[], noWorkItems: number, noSimulations: number) : number[][] {
        let result = [];
        let runningRow = Array(noSimulations).fill(0);
        for(let i = 0; i < noWorkItems; i++) {
            for(let s = 0; s < noSimulations; s++) {
                // randomly select a takt time sample from given set
                runningRow[s] += taktTimeSample[Math.floor(Math.random() * taktTimeSample.length)];           
            }
            result.push(runningRow.map(it => it));
        }
        return result;
    }

    runSprintSimulations(simulatedTaktTimes : number[][], sprintLengths : number[]) : number[][] {
        if(!simulatedTaktTimes || !sprintLengths){
            return null;
        }

        let sprintsCumulative = [];
        sprintLengths.reduce((a,b,i) => sprintsCumulative[i] = a+b, 0);
        
        let probabilities = [];

        for(let itemCtr = 0; itemCtr < simulatedTaktTimes.length; itemCtr++){
            let row = [];
            for(let sprintCtr = 0; sprintCtr < sprintLengths.length; sprintCtr++){
                let finished = simulatedTaktTimes[itemCtr].filter(it => it <= sprintsCumulative[sprintCtr]);
                let prob = finished.length / simulatedTaktTimes[itemCtr].length;
                row.push(prob);
            }
            probabilities.push(row);
        }
        return probabilities;
    }
}