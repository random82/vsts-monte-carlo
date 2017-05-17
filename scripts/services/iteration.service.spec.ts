import {
    IterationService
} from './iteration.service';

import {
    IterationClient
} from './iteration.client.base';

import {
    expect
} from 'chai';

import 'jasmine';

import * as sinon from 'sinon';

describe('IterationService', ()=>{

    let iterationClient = new IterationClient();

    let sandbox = sinon.sandbox.create();
    let iterationService: IterationService;

    describe('Iteration info', ()=>{

    });
});