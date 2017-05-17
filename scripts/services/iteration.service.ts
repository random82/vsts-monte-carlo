import {
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

    constructor(private iterationClient : IterationClient){

    }

    public GetIterations() : Iteration[] {
        return null;
    }

    public GetWorkingDaysSince(beginDate:Date) : Date[] {
        return null;
    }
}