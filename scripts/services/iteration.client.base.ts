import {
    Injectable
} from '@angular/core';

import {
    Iteration
} from '../model/iteration';

Injectable();
export class IterationClient {
    public getTeamIterations(): Promise<Iteration[]> {
        throw new Error('Method not implemented.');
    }
}