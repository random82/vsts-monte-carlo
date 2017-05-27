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

    private readonly iterationClient: IterationClient;

    private iterations: Iteration[];

    constructor(@Inject(IterationClient) iterationClient: IterationClient) {
        this.iterationClient = iterationClient;
    }

    public async getIterations(tillDate ? : Date): Promise < Iteration[] > {
        if (this.iterations) {
            Promise.resolve(this.iterations);
        }

        const iterations = await this.iterationClient.getTeamIterations();

        let result = iterations.map(it => {
            if(it.startDate && it.endDate) {
                it.workingDays = Math.floor(it.endDate.getDate() - it.startDate.getDate()) / 86400000;
            }
            return it;   
        })

        if (!tillDate) {
            return iterations;
        } else {
            return iterations.filter(it => (it.endDate !== null) && it.endDate < tillDate);
        }
    }

    public getWorkingDays(from: Date, to : Date, daysOff : Date[]): Date[] {
        let days : Date[] = [];
        let iterator = this.getDates(from, to);
        while(true){
            let d = iterator.next();
            if(d.done) {
                break;
            }

            if(daysOff.findIndex(it => it.getTime() === d.value.getTime()) === -1){
                days.push(d.value);
            }
        }
        return days;
    }

    public* getDates(startDate:Date, stopDate:Date){
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            currentDate.setDate(currentDate.getDate() + 1);
            yield currentDate;
        }
    }
}