import {
    ProjectSettingsClient
} from '../../scripts/services/project-settings.client.base';

import {
    DayOfWeek,
    Iteration
} from '../../scripts/model/iteration';

export class MockProjectSettingsClient extends ProjectSettingsClient {

    private readonly iterations: Iteration[]; 

    constructor() {
        super();
        this.iterations = require('json!../../sample_data/Iterations.json');
    }

    getTeamIterations(): Promise<Iteration[]> {
        return Promise.resolve(this.iterations);
    }
}