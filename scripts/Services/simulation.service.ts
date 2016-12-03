
export interface SimulationParams {
    iterations:number;
    sprintLength:number;
}

export class Simulation{

    private params: SimulationParams;
    
    setup(params: SimulationParams) {
        this.params = params;
    };

    runTT(sampleSet : Array<number>, noSprints : number, noItems : number) : Array<number> {
        let results: Array<number> = [];
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

    runItemsPerSprint() {

    }
}