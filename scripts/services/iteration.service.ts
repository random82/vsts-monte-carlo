import {
    Inject,
    Injectable
} from '@angular/core';

import {
    IterationClient
} from './iteration.client.base';

import {
    Iteration
} from '../model/iteration';

Injectable();
export class IterationService {

    private readonly iterationClient : IterationClient;

    constructor(@Inject(IterationClient)iterationClient : IterationClient){
        this.iterationClient = iterationClient;
    }

    public GetIterations() : Iteration[] {
        return null;
    }

    public GetWorkingDays(from:Date, to?:Date) : Date[] {
        return null;
    }
}