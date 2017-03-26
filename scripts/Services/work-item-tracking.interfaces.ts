import {
    WorkItemReference,
    WorkItem
} from '../Model/WorkItem'


export declare abstract class GetCompletedItemsRef {
    abstract getCompletedWorkItemRefs(): Q.Promise<WorkItemReference[]>;
}

export declare abstract class GetInProgressItemsRef {
    abstract getInProgressWorkItemRefs(): Q.Promise<WorkItemReference[]>;
}

export declare abstract class GetWorkItems {
    abstract getWorkItems(ids : Array<number>) : Q.Promise<WorkItem[]>;
}

