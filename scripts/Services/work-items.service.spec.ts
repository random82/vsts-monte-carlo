import {
    WorkItemsService
} from './work-items.service';
import {
    IWorkItemTrackingClient
} from './work-item-tracking.client';

import {
    WorkItemReference, 
    WorkItem
} from "TFS/WorkItemTracking/Contracts";

import {
    expect
} from 'chai';

let sampleResponseJson = {
    "queryType": "flat",
    "queryResultType": "workItem",
    "asOf": "2016-11-11T03:42:22.53Z",
    "columns": [{
        "referenceName": "System.Id",
        "name": "ID",
        "url": "https://evodesign.visualstudio.com/DefaultCollection/_apis/wit/fields/System.Id"
    }, {
        "referenceName": "System.Title",
        "name": "Title",
        "url": "https://evodesign.visualstudio.com/DefaultCollection/_apis/wit/fields/System.Title"
    }, {
        "referenceName": "System.State",
        "name": "State",
        "url": "https://evodesign.visualstudio.com/DefaultCollection/_apis/wit/fields/System.State"
    }],
    "sortColumns": [{
        "field": {
        "referenceName": "Microsoft.VSTS.Common.Priority",
        "name": "Priority",
        "url": "https://evodesign.visualstudio.com/DefaultCollection/_apis/wit/fields/Microsoft.VSTS.Common.Priority"
        },
        "descending": false
    }, {
        "field": {
        "referenceName": "System.CreatedDate",
        "name": "Created Date",
        "url": "https://evodesign.visualstudio.com/DefaultCollection/_apis/wit/fields/System.CreatedDate"
        },
        "descending": true
    }],
    "workItems": [{
        "id": 21,
        "url": "https://evodesign.visualstudio.com/DefaultCollection/_apis/wit/workItems/21"
    }, {
        "id": 20,
        "url": "https://evodesign.visualstudio.com/DefaultCollection/_apis/wit/workItems/20"
    }, {
        "id": 19,
        "url": "https://evodesign.visualstudio.com/DefaultCollection/_apis/wit/workItems/19"
    }]
};

let getWorkItemsJson = {
  "count": 3,
  "value": [
    {
      "id": 19,
      "rev": 2,
      "fields": {
        "System.Id": 19,
        "System.WorkItemType": "Product Backlog Item",
        "System.State": "New",
        "System.Title": "Optimise bundling",
        "Microsoft.VSTS.Common.BacklogPriority": 1999985093
      },
      "url": "https://evodesign.visualstudio.com/DefaultCollection/_apis/wit/workItems/19"
    },
    {
      "id": 20,
      "rev": 4,
      "fields": {
        "System.Id": 20,
        "System.WorkItemType": "Product Backlog Item",
        "System.State": "Committed",
        "System.Title": "Integrate TFS queries",
        "Microsoft.VSTS.Common.BacklogPriority": 1999955279
      },
      "url": "https://evodesign.visualstudio.com/DefaultCollection/_apis/wit/workItems/20"
    },
    {
      "id": 21,
      "rev": 3,
      "fields": {
        "System.Id": 21,
        "System.WorkItemType": "Product Backlog Item",
        "System.State": "Approved",
        "System.Title": "Visualise MC results",
        "Microsoft.VSTS.Common.BacklogPriority": 1999977640
      },
      "url": "https://evodesign.visualstudio.com/DefaultCollection/_apis/wit/workItems/21"
    }
  ]
}

describe("WorkItemsService", () => {
    let getCompletedWisRefsClientStub: Sinon.SinonSpy;
    let getWIs: Sinon.SinonSpy;
    let witService: WorkItemsService;

    let responseRefs = sampleResponseJson.workItems.map((it) => < WorkItemReference > {
        id: it.id,
        url: it.url
    });

    let responseWIs = getWorkItemsJson.value.map((it) => < WorkItem > {
        id: it.id,
        url: it.url,
        rev: it.rev,
        fields: it.fields,
        relations: null,
        _links: null
    });

    let workItemTrackingClient = < IWorkItemTrackingClient > {
        getCompletedWorkItemRefs: () : Array<WorkItemReference> => { return null },
        getWorkItems: () : Array<WorkItem> =>  { return null }
    };

    beforeEach(() => {
        getCompletedWisRefsClientStub = sinon.stub(workItemTrackingClient, 'getCompletedWorkItemRefs').returns(responseRefs);
        getWIs = sinon.stub(workItemTrackingClient, 'getWorkItems').returns(responseWIs);
        witService = new WorkItemsService(workItemTrackingClient);
    });

    afterEach(() => {
        sinon.restore(workItemTrackingClient.getCompletedWorkItemRefs);
        sinon.restore(workItemTrackingClient.getWorkItems);
    });

    it("Should call wit client", () => {
        witService.getCompletedWorkItems();
        expect(getCompletedWisRefsClientStub.calledOnce);
         expect(getWIs.calledOnce);
    })

    it("Should call wit client", () => {
        let result = witService.getCompletedWorkItems();
        expect(result).to.have.lengthOf(3);
        expect(result[0].id).to.eq(20);
        expect(result[1].id).to.eq(21);
        expect(result[2].id).to.eq(19);
    })
})
