import {
    IterationService
} from './iteration.service';

import {
    IterationClient
} from './iteration.client.base';

import {
    Iteration
} from '../model/iteration';

import {
    expect
} from 'chai';

import 'jasmine';

import * as sinon from 'sinon';

describe('IterationService', ()=>{

    let iterationClient = new IterationClient();

    let sandbox = sinon.sandbox.create();
    let iterationService: IterationService;

    describe('Iteration info', () => {

        beforeAll(() => {
            iterationService = new IterationService(iterationClient);
        });

        it('Should return non empty array', () => {
            let result = iterationService.GetIterations();
            expect(result).to.not.be.null;
        });
    });

    describe('Working days', () => {



        beforeAll(() => {
            iterationService = new IterationService(iterationClient);

            
        });

        it('Should return 10 working days', () => {
            let from = new Date(2017, 5, 8);
            let to = new Date(2017, 5, 19);

            let result = iterationService.GetWorkingDays(from, to);
            expect(result).to.eq(10);
        })

    });
});