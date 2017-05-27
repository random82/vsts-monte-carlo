import {
    Injectable
} from '@angular/core';

import {
    Iteration
} from '../model/iteration';

import {
    TeamSettingsIteration
} from 'TFS/Work/Contracts';

Injectable();
export class IterationClient {
    public getTeamIterations(): Promise<Iteration[]> {
        throw new Error('Method not implemented.');
    }

    public mapModel(input:TeamSettingsIteration) : Iteration {
        return <Iteration>{
            _links: input._links,
            attributes: input.attributes,
            id: input.id,
            name: input.name,
            path: input.path,
            url: input.url,
            endDate: input.attributes.finishDate,
            startDate: input.attributes.startDate
        };
    }
}