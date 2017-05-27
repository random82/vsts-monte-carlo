import {
    TeamSettingsIteration
} from 'TFS/Work/Contracts';


export interface Iteration extends TeamSettingsIteration {
    startDate: Date;
    endDate: Date;
    workingDays: number;
}

export enum DayOfWeek {
    /**
     * Indicates Sunday.
     */
    Sunday = 0,
    /**
     * Indicates Monday.
     */
    Monday = 1,
    /**
     * Indicates Tuesday.
     */
    Tuesday = 2,
    /**
     * Indicates Wednesday.
     */
    Wednesday = 3,
    /**
     * Indicates Thursday.
     */
    Thursday = 4,
    /**
     * Indicates Friday.
     */
    Friday = 5,
    /**
     * Indicates Saturday.
     */
    Saturday = 6,
}