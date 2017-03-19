import * as TFSContracts from 'TFS/WorkItemTracking/Contracts';

export declare abstract class GetCompletedItemsRef {
    abstract getCompletedWorkItemRefs(): Q.Promise<TFSContracts.WorkItemReference[]>;
}

export declare abstract class GetInProgressItemsRef {
    abstract getInProgressWorkItemRefs(): Q.Promise<TFSContracts.WorkItemReference[]>;
}

export declare abstract class GetWorkItems {
    abstract getWorkItems(ids : Array<number>) : Q.Promise<TFSContracts.WorkItem[]>;
}

