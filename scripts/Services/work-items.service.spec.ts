import { WorkItemsService } from './work-items.service';
import { IWorkItemTrackingClient } from './work-item-tracking.client';
import { expect } from 'chai';

let sampleResponse = {
  "queryType": "flat",
  "queryResultType": "workItem",
  "asOf": "2016-11-11T03:42:22.53Z",
  "columns": [
    {
      "referenceName": "System.Id",
      "name": "ID",
      "url": "https://evodesign.visualstudio.com/DefaultCollection/_apis/wit/fields/System.Id"
    },
    {
      "referenceName": "System.Title",
      "name": "Title",
      "url": "https://evodesign.visualstudio.com/DefaultCollection/_apis/wit/fields/System.Title"
    },
    {
      "referenceName": "System.State",
      "name": "State",
      "url": "https://evodesign.visualstudio.com/DefaultCollection/_apis/wit/fields/System.State"
    }
  ],
  "sortColumns": [
    {
      "field": {
        "referenceName": "Microsoft.VSTS.Common.Priority",
        "name": "Priority",
        "url": "https://evodesign.visualstudio.com/DefaultCollection/_apis/wit/fields/Microsoft.VSTS.Common.Priority"
      },
      "descending": false
    },
    {
      "field": {
        "referenceName": "System.CreatedDate",
        "name": "Created Date",
        "url": "https://evodesign.visualstudio.com/DefaultCollection/_apis/wit/fields/System.CreatedDate"
      },
      "descending": true
    }
  ],
  "workItems": [
    {
      "id": 21,
      "url": "https://evodesign.visualstudio.com/DefaultCollection/_apis/wit/workItems/21"
    },
    {
      "id": 20,
      "url": "https://evodesign.visualstudio.com/DefaultCollection/_apis/wit/workItems/20"
    },
    {
      "id": 19,
      "url": "https://evodesign.visualstudio.com/DefaultCollection/_apis/wit/workItems/19"
    }
  ]
}

describe("WorkItemsService", () => {
    let witClientStub: Sinon.SinonSpy;
    let witService : WorkItemsService;

    let responseRefs = sampleResponse.workItems.map((it) => {} )
    let workItemTrackingClient = <IWorkItemTrackingClient>{
        getCompletedWorkItemRefs : () => {}
    };

    beforeEach(() => {
        witClientStub = sinon.stub(workItemTrackingClient, 'getDoneWorkItems').returns(sampleResponse);
        witService = new WorkItemsService(workItemTrackingClient);
    });

    afterEach(()=>{
        sinon.restore(workItemTrackingClient.getCompletedWorkItemRefs);
    });

    it("Should call wit client", () => {
        witService.getCompletedWorkItems();
        expect(witClientStub.calledOnce);
    })

    it("Should call wit client", () => {
        let result = witService.getCompletedWorkItems();
        expect(result).to.have.lengthOf(3);
        expect(result[0].id).to.eq(21);
        expect(result[1].id).to.eq(20);
        expect(result[2].id).to.eq(19);
    })
})