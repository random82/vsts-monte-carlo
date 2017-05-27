import {
    IterationService
} from './iteration.service';

import {
    IterationClient
} from './iteration.client.base';

import {
    Iteration, 
    Months
} from '../model/iteration';

import {
    expect
} from 'chai';

import 'jasmine';

import * as sinon from 'sinon';

describe('IterationService', () => {

    let iterationClient = new IterationClient();

    let sandbox = sinon.sandbox.create();
    let iterationService: IterationService;

    let getIterationsStub: sinon.SinonStub;

    let iterationsResponse = {
        "count": 6,
        "value": [{
                "id": "f8d9897e-359a-47c5-bd41-4dea0f50e6e3",
                "name": "Sprint 1",
                "path": "VSTS Monte Carlo\\Sprint 1",
                "attributes": {
                    "startDate": "2017-02-05T00:00:00Z",
                    "finishDate": "2017-02-17T00:00:00Z"
                },
                "url": "https://dummy.com/DefaultCollection/99468b41-a75b-46ac-9eed-1c64fd09acc4/469172a1-0b0d-4a99-93f8-5464f76859d3/_apis/work/teamsettings/iterations/f8d9897e-359a-47c5-bd41-4dea0f50e6e3"
            },
            {
                "id": "97de67d5-fd6f-4af6-8fbd-1a66c001c2af",
                "name": "Sprint 2",
                "path": "VSTS Monte Carlo\\Sprint 2",
                "attributes": {
                    "startDate": "2017-02-19T00:00:00Z",
                    "finishDate": "2017-03-02T00:00:00Z"
                },
                "url": "https://dummy.com/DefaultCollection/99468b41-a75b-46ac-9eed-1c64fd09acc4/469172a1-0b0d-4a99-93f8-5464f76859d3/_apis/work/teamsettings/iterations/97de67d5-fd6f-4af6-8fbd-1a66c001c2af"
            },
            {
                "id": "ee083dd1-4860-43dc-bd35-4a75668d42b7",
                "name": "Sprint 3",
                "path": "VSTS Monte Carlo\\Sprint 3",
                "attributes": {
                    "startDate": "2017-03-06T00:00:00Z",
                    "finishDate": "2017-03-17T00:00:00Z"
                },
                "url": "https://dummy.com/DefaultCollection/99468b41-a75b-46ac-9eed-1c64fd09acc4/469172a1-0b0d-4a99-93f8-5464f76859d3/_apis/work/teamsettings/iterations/ee083dd1-4860-43dc-bd35-4a75668d42b7"
            },
            {
                "id": "c8c71fb4-015f-4878-9c26-c26f7bc96440",
                "name": "Sprint 4",
                "path": "VSTS Monte Carlo\\Sprint 4",
                "attributes": {
                    "startDate": null,
                    "finishDate": null
                },
                "url": "https://dummy.com/DefaultCollection/99468b41-a75b-46ac-9eed-1c64fd09acc4/469172a1-0b0d-4a99-93f8-5464f76859d3/_apis/work/teamsettings/iterations/c8c71fb4-015f-4878-9c26-c26f7bc96440"
            },
            {
                "id": "a1bdd46c-796e-4764-bf54-20eaef5afb8a",
                "name": "Sprint 5",
                "path": "VSTS Monte Carlo\\Sprint 5",
                "attributes": {
                    "startDate": null,
                    "finishDate": null
                },
                "url": "https://dummy.com/DefaultCollection/99468b41-a75b-46ac-9eed-1c64fd09acc4/469172a1-0b0d-4a99-93f8-5464f76859d3/_apis/work/teamsettings/iterations/a1bdd46c-796e-4764-bf54-20eaef5afb8a"
            },
            {
                "id": "0293480b-4acf-400a-9f94-06d704874f70",
                "name": "Sprint 6",
                "path": "VSTS Monte Carlo\\Sprint 6",
                "attributes": {
                    "startDate": null,
                    "finishDate": null
                },
                "url": "https://dummy.com/DefaultCollection/99468b41-a75b-46ac-9eed-1c64fd09acc4/469172a1-0b0d-4a99-93f8-5464f76859d3/_apis/work/teamsettings/iterations/0293480b-4acf-400a-9f94-06d704874f70"
            }
        ]
    };

    describe('Iteration info', () => {
        let response : Iteration[] = iterationsResponse.value.map(it => {
            return <Iteration>{
                id: it.id,
                name: it.name,
                path: it.path,
                url: it.url,
                endDate: it.attributes.finishDate ? new Date(it.attributes.finishDate) : null,
                startDate: it.attributes.startDate ? new Date(it.attributes.startDate) : null,
                workingDays: 0
           };
        });

        beforeEach(() => {
            iterationService = new IterationService(iterationClient);
            getIterationsStub = sandbox.stub(iterationClient, 'getTeamIterations').returns(Promise.resolve(response));
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('Should return array with all 6 iterations', (done) => {
            iterationService.getIterations().then(result => {
                expect(getIterationsStub.calledOnce).to.be.true;
                expect(result).to.not.be.undefined;
                expect(result).to.have.lengthOf(6);
                done();
            }).catch(error => {
                fail(error);
            });
        });

        it('Should return array with past 3 iterations', (done) => {
            let tillDate = new Date(2017, Months.March, 6);

            iterationService.getIterations(tillDate).then(result => {
                expect(getIterationsStub.calledOnce).to.be.true;
                expect(result).to.not.be.undefined;
                expect(result).to.have.lengthOf(2);
                done();
            }).catch(error => {
                fail(error);
            });
        });
    });

    describe('Working days', () => {

        beforeAll(() => {
            iterationService = new IterationService(iterationClient);

        });

        afterAll(() => {
            sandbox.restore();
        });

        it('Should return 10 working days', () => {
            let from = new Date(2017, Months.May, 8);
            let to = new Date(2017, Months.May, 19);
            let daysOff = [
                new Date(2017, Months.May, 13),
                new Date(2017, Months.May, 14),
                new Date(2017, Months.May, 21)
            ];

            let result = iterationService.getWorkingDays(from, to, daysOff);
            expect(result).to.have.lengthOf(10);
        });

    });
});