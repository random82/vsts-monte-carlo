import {
    IterationClient
} from '../../scripts/services/iteration.client.base';

import {
    DayOfWeek,
    Iteration
} from '../../scripts/model/iteration';

export class MockIterationClient extends IterationClient {

    private readonly iterations: Iteration[]; 

    constructor() {
        super();
        this.iterations = require('json!../../sample_data/Iterations.json');
    }

    getTeamIterations(): Promise<Iteration[]> {
        return Promise.resolve(this.iterations);
    }
}