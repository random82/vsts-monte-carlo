import {
    WorkItemsService
} from './work-items.service';

import {
    WorkItemTrackingClient
} from './work-item-tracking.client';

import {
    WorkItemReference,
    WorkItem
} from "../Model/WorkItem";

import {
    expect
} from 'chai';

import 'jasmine';

import * as sinon from 'sinon';

import * as Q from 'q';

describe("WorkItemsService", function() {

    let getCompletedWorkItemRefsDeffered: Q.Deferred < WorkItemReference[] > ;
    let getInProgressWorkItemRefsDeffered: Q.Deferred < WorkItemReference[] > ;
    let getWorkItemsDeffered: Q.Deferred < WorkItem[] > ;
    let getWorkItemRefsByWIQLDeffered: Q.Deferred < WorkItemReference[] > ;

    let workItemTrackingClient: WorkItemTrackingClient = {
        projectId: "",
        getCompletedWorkItemRefs: (): Q.Promise < WorkItemReference[] > => {
            return null;
        },
        getInProgressWorkItemRefs: (): Q.Promise < WorkItemReference[] > => {
            return null;
        },
        getWorkItems: (): Q.Promise < WorkItem[] > => {
            return null;
        },
        getWorkItemRefsByWIQL: (): Q.Promise < WorkItemReference[] > => {
            return null;
        }
    };

    var sandbox = sinon.sandbox.create();

    let getWIs: sinon.SinonSpy;
    let witService: WorkItemsService;

    describe("In progress items", function() {

        let sampleInProgressResponseJson = {
            "queryType": "flat",
            "queryResultType": "workItem",
            "asOf": "2016-11-11T03:42:22.53Z",
            "columns": [{
                "referenceName": "System.Id",
                "name": "ID",
                "url": "https://dummy.com/DefaultCollection/_apis/wit/fields/System.Id"
            }, {
                "referenceName": "System.Title",
                "name": "Title",
                "url": "https://dummy.com/DefaultCollection/_apis/wit/fields/System.Title"
            }, {
                "referenceName": "System.State",
                "name": "State",
                "url": "https://dummy.com/DefaultCollection/_apis/wit/fields/System.State"
            }],
            "sortColumns": [{
                "field": {
                    "referenceName": "Microsoft.VSTS.Common.Priority",
                    "name": "Priority",
                    "url": "https://dummy.com/DefaultCollection/_apis/wit/fields/Microsoft.VSTS.Common.Priority"
                },
                "descending": false
            }, {
                "field": {
                    "referenceName": "System.CreatedDate",
                    "name": "Created Date",
                    "url": "https://dummy.com/DefaultCollection/_apis/wit/fields/System.CreatedDate"
                },
                "descending": true
            }],
            "workItems": [{
                "id": 21,
                "url": "https://dummy.com/DefaultCollection/_apis/wit/workItems/21"
            }, {
                "id": 20,
                "url": "https://dummy.com/DefaultCollection/_apis/wit/workItems/20"
            }, {
                "id": 19,
                "url": "https://dummy.com/DefaultCollection/_apis/wit/workItems/19"
            }]
        };

        let getInProgressWorkItemsJson = {
            "count": 3,
            "value": [{
                "id": 19,
                "rev": 2,
                "fields": {
                    "System.Id": 19,
                    "System.WorkItemType": "Product Backlog Item",
                    "System.State": "New",
                    "System.Title": "Optimise bundling",
                    "Microsoft.VSTS.Common.BacklogPriority": 1999985093
                },
                "url": "https://dummy.com/DefaultCollection/_apis/wit/workItems/19"
            }, {
                "id": 20,
                "rev": 4,
                "fields": {
                    "System.Id": 20,
                    "System.WorkItemType": "Product Backlog Item",
                    "System.State": "Committed",
                    "System.Title": "Integrate TFS queries",
                    "Microsoft.VSTS.Common.BacklogPriority": 1999955279
                },
                "url": "https://dummy.com/DefaultCollection/_apis/wit/workItems/20"
            }, {
                "id": 21,
                "rev": 3,
                "fields": {
                    "System.Id": 21,
                    "System.WorkItemType": "Product Backlog Item",
                    "System.State": "Approved",
                    "System.Title": "Visualise MC results",
                    "Microsoft.VSTS.Common.BacklogPriority": 1999977640
                },
                "url": "https://dummy.com/DefaultCollection/_apis/wit/workItems/21"
            }]
        };

        let getWisRefsClientStub: sinon.SinonSpy;

        let responseRefs = sampleInProgressResponseJson.workItems.map((it) => < WorkItemReference > {
            id: it.id,
            url: it.url
        });

        let responseWIs = getInProgressWorkItemsJson.value.map((it) => < WorkItem > {
            id: it.id,
            url: it.url,
            rev: it.rev,
            fields: it.fields,
            relations: null,
            _links: null
        });

        beforeEach(function() {
            getInProgressWorkItemRefsDeffered = Q.defer < WorkItemReference[] > ();
            getWorkItemsDeffered = Q.defer < WorkItem[] > ();
            getWorkItemRefsByWIQLDeffered = Q.defer < WorkItemReference[] > ();

            getWIs = sandbox.stub(workItemTrackingClient, 'getWorkItems').returns(getWorkItemsDeffered.promise);
            getWisRefsClientStub = sandbox.stub(workItemTrackingClient, 'getInProgressWorkItemRefs').returns(getInProgressWorkItemRefsDeffered.promise);
            witService = new WorkItemsService(workItemTrackingClient);
        });

        afterEach(function() {
            sandbox.restore();
        });

        it("Should call wit client", function() {
            witService.getInProgressWorkItems();
            getInProgressWorkItemRefsDeffered.resolve(responseRefs);
            expect(getWisRefsClientStub.calledOnce);
            expect(getWIs.calledOnce);
        });

        it("Should return 3 items", function(done) {
            witService.getInProgressWorkItems().then(function(result) {
                expect(result).to.have.lengthOf(3);
                expect(result[0].id).to.eq(20);
                expect(result[1].id).to.eq(21);
                expect(result[2].id).to.eq(19);
            }).then(done, error => {
                fail(error);
                done();
            });
            getInProgressWorkItemRefsDeffered.resolve(responseRefs);
            getWorkItemsDeffered.resolve(responseWIs);
        });
    });

    describe("Completed work items", function() {

        let sampleCompletedJson = {
            "queryType": "flat",
            "queryResultType": "workItem",
            "asOf": "2016-11-13T10:54:43.877Z",
            "columns": [{
                "referenceName": "System.Id",
                "name": "ID",
                "url": "https://dummy.com/DefaultCollection/_apis/wit/fields/System.Id"
            }, {
                "referenceName": "System.Title",
                "name": "Title",
                "url": "https://dummy.com/DefaultCollection/_apis/wit/fields/System.Title"
            }, {
                "referenceName": "System.State",
                "name": "State",
                "url": "https://dummy.com/DefaultCollection/_apis/wit/fields/System.State"
            }],
            "sortColumns": [{
                "field": {
                    "referenceName": "Microsoft.VSTS.Common.BacklogPriority",
                    "name": "Backlog Priority",
                    "url": "https://dummy.com/DefaultCollection/_apis/wit/fields/Microsoft.VSTS.Common.BacklogPriority"
                },
                "descending": false
            }, {
                "field": {
                    "referenceName": "System.CreatedDate",
                    "name": "Created Date",
                    "url": "https://dummy.com/DefaultCollection/_apis/wit/fields/System.CreatedDate"
                },
                "descending": true
            }],
            "workItems": [{
                "id": 17,
                "url": "https://dummy.com/DefaultCollection/_apis/wit/workItems/17"
            }]
        };

        let getCompletedWorkItemsJson = {
            "count": 1,
            "value": [{
                "id": 17,
                "rev": 7,
                "fields": {
                    "System.Id": 17,
                    "System.IterationPath": "VSTS Monte Carlo\\Sprint 1",
                    "System.WorkItemType": "Product Backlog Item",
                    "System.State": "Done",
                    "System.Title": "Setup build definition",
                    "Microsoft.VSTS.Common.ClosedDate": "2016-11-13T11:17:17.933Z",
                    "Microsoft.VSTS.Common.BacklogPriority": 1999966460
                },
                "url": "https://dummy.com/DefaultCollection/_apis/wit/workItems/17"
            }]
        };

        let getCompletedWIRefs: sinon.SinonSpy;

        let responseRefs = sampleCompletedJson.workItems.map((it) => < WorkItemReference > {
            id: it.id,
            url: it.url
        });

        let responseWIs = getCompletedWorkItemsJson.value.map((it) => < WorkItem > {
            id: it.id,
            url: it.url,
            rev: it.rev,
            fields: it.fields,
            relations: null,
            _links: null
        });

        beforeEach(function() {
            getCompletedWorkItemRefsDeffered = Q.defer < WorkItemReference[] > ();
            getWorkItemsDeffered = Q.defer < WorkItem[] > ();

            getWIs = sandbox.stub(workItemTrackingClient, 'getWorkItems').returns(getWorkItemsDeffered.promise);
            getCompletedWIRefs = sandbox.stub(workItemTrackingClient, 'getCompletedWorkItemRefs').returns(getCompletedWorkItemRefsDeffered.promise);
            witService = new WorkItemsService(workItemTrackingClient);
        });

        afterEach(function() {
            sandbox.restore();
        });

        it("Should call wit client", function() {
            witService.getCompletedWorkItems();
            getCompletedWorkItemRefsDeffered.resolve(responseRefs);
            getWorkItemsDeffered.resolve(responseWIs);
            expect(getCompletedWIRefs.calledOnce);
            expect(getWIs.calledOnce);
        });

        it("Should return one item", function(done) {
            witService.getCompletedWorkItems().then(function(result) {
                expect(result).to.have.lengthOf(1);
                expect(result[0].id).to.eq(17);
            }).then(done, fail);
            getCompletedWorkItemRefsDeffered.resolve(responseRefs);
            getWorkItemsDeffered.resolve(responseWIs);
        });


    });

    describe("", function() {

    });

    describe("Takt time calculation for work items list", function() {
        let sampleCompletedJson = {
            "queryType": "flat",
            "queryResultType": "workItem",
            "asOf": "2016-11-13T10:54:43.877Z",
            "columns": [{
                "referenceName": "System.Id",
                "name": "ID",
                "url": "https://dummy.com/DefaultCollection/_apis/wit/fields/System.Id"
            }, {
                "referenceName": "System.Title",
                "name": "Title",
                "url": "https://dummy.com/DefaultCollection/_apis/wit/fields/System.Title"
            }, {
                "referenceName": "System.State",
                "name": "State",
                "url": "https://dummy.com/DefaultCollection/_apis/wit/fields/System.State"
            }],
            "sortColumns": [{
                "field": {
                    "referenceName": "Microsoft.VSTS.Common.BacklogPriority",
                    "name": "Backlog Priority",
                    "url": "https://dummy.com/DefaultCollection/_apis/wit/fields/Microsoft.VSTS.Common.BacklogPriority"
                },
                "descending": false
            }, {
                "field": {
                    "referenceName": "System.CreatedDate",
                    "name": "Created Date",
                    "url": "https://dummy.com/DefaultCollection/_apis/wit/fields/System.CreatedDate"
                },
                "descending": true
            }],
            "workItems": [{
                "id": 47,
                "url": "https://dummy.com/DefaultCollection/_apis/wit/workItems/47"
            }, {
                "id": 88,
                "url": "https://dummy.com/DefaultCollection/_apis/wit/workItems/48"
            }, {
                "id": 49,
                "url": "https://dummy.com/DefaultCollection/_apis/wit/workItems/49"
            }, {
                "id": 50,
                "url": "https://dummy.com/DefaultCollection/_apis/wit/workItems/50"
            }]
        };

        let getCompletedWorkItemsJson = {
            "count": 4,
            "value": [{
                    "id": 47,
                    "rev": 9,
                    "fields": {
                        "System.Id": 47,
                        "System.IterationPath": "VSTS Monte Carlo\\Sprint 1",
                        "System.WorkItemType": "Product Backlog Item",
                        "System.State": "Done",
                        "System.Title": "Dummy 1",
                        "Microsoft.VSTS.Common.ClosedDate": "2016-11-15T14:17:17.933Z",
                        "Microsoft.VSTS.Common.BacklogPriority": 1999966460
                    },
                    "url": "https://dummy.com/DefaultCollection/_apis/wit/workItems/47"
                },
                {
                    "id": 48,
                    "rev": 9,
                    "fields": {
                        "System.Id": 48,
                        "System.IterationPath": "VSTS Monte Carlo\\Sprint 1",
                        "System.WorkItemType": "Product Backlog Item",
                        "System.State": "Done",
                        "System.Title": "Dummy 2",
                        "Microsoft.VSTS.Common.ClosedDate": "2016-11-13T15:17:17.933Z",
                        "Microsoft.VSTS.Common.BacklogPriority": 1999966423
                    },
                    "url": "https://dummy.com/DefaultCollection/_apis/wit/workItems/48"
                },
                {
                    "id": 49,
                    "rev": 9,
                    "fields": {
                        "System.Id": 49,
                        "System.IterationPath": "VSTS Monte Carlo\\Sprint 1",
                        "System.WorkItemType": "Product Backlog Item",
                        "System.State": "Done",
                        "System.Title": "Dummy 3",
                        "Microsoft.VSTS.Common.ClosedDate": "2016-11-10T16:12:17.933Z",
                        "Microsoft.VSTS.Common.BacklogPriority": 1999966498
                    },
                    "url": "https://dummy.com/DefaultCollection/_apis/wit/workItems/49"
                },
                {
                    "id": 50,
                    "rev": 9,
                    "fields": {
                        "System.Id": 50,
                        "System.IterationPath": "VSTS Monte Carlo\\Sprint 1",
                        "System.WorkItemType": "Product Backlog Item",
                        "System.State": "Done",
                        "System.Title": "Dummy 4",
                        "Microsoft.VSTS.Common.ClosedDate": "2016-11-13T16:12:17.933Z",
                        "Microsoft.VSTS.Common.BacklogPriority": 1999966498
                    },
                    "url": "https://dummy.com/DefaultCollection/_apis/wit/workItems/50"
                }
            ]
        };

        let getCompletedWIRefs: sinon.SinonSpy;

        let responseRefs = sampleCompletedJson.workItems.map((it) => < WorkItemReference > {
            id: it.id,
            url: it.url
        });

        let responseWIs = getCompletedWorkItemsJson.value.map((it) => < WorkItem > {
            id: it.id,
            url: it.url,
            rev: it.rev,
            fields: it.fields,
            relations: null,
            _links: null
        });

        beforeEach(function() {
            getCompletedWorkItemRefsDeffered = Q.defer < WorkItemReference[] > ();
            getWorkItemsDeffered = Q.defer < WorkItem[] > ();

            getWIs = sandbox.stub(workItemTrackingClient, 'getWorkItems').returns(getWorkItemsDeffered.promise);
            getCompletedWIRefs = sandbox.stub(workItemTrackingClient, 'getCompletedWorkItemRefs').returns(getCompletedWorkItemRefsDeffered.promise);
            witService = new WorkItemsService(workItemTrackingClient);
        });

        afterEach(function() {
            sandbox.restore();
        });

        it("Should return four items", function(done) {
            witService.getCompletedWorkItems().then(function(result) {
                expect(result).to.have.lengthOf(4);
            }).then(done, error => {
                fail(error);
                done();
            });
            getCompletedWorkItemRefsDeffered.resolve(responseRefs);
            getWorkItemsDeffered.resolve(responseWIs);
        });

        it("Should return completed items by completion date", function(done) {
            witService.getCompletedWorkItems().then(function(result) {
                expect(result).to.have.lengthOf(4);
                expect(result[0].id).to.eq(49);
                expect(result[1].id).to.eq(48);
                expect(result[2].id).to.eq(50);
                expect(result[3].id).to.eq(47);
            }).then(done, error => {
                fail(error);
                done();
            });
            getCompletedWorkItemRefsDeffered.resolve(responseRefs);
            getWorkItemsDeffered.resolve(responseWIs);
        });

        it("Should return takt times as differences between subsequent completion days", function(done) {
            witService.getCompletedWorkItems().then(function(result) {
                expect(result).to.have.lengthOf(4);
                expect(result[0].taktTime).to.eq(0); //"2016-11-10"
                expect(result[1].taktTime).to.eq(3, "Second item should have TT 3"); //"2016-11-13"
                expect(result[2].taktTime).to.eq(0, "Third item should have TT 0"); //"2016-11-13"
                expect(result[3].taktTime).to.eq(2, "Fourth item should have TT 2"); //"2016-11-15"
            }).then(done, error => {
                fail(error);
                done();
            });
            getCompletedWorkItemRefsDeffered.resolve(responseRefs);
            getWorkItemsDeffered.resolve(responseWIs);
        });
    });
});