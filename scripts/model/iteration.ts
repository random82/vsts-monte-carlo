import {
    TeamSettingsIteration
} from 'TFS/Work/Contracts';


export interface Iteration extends TeamSettingsIteration {
    startDate: Date;
    endDate: Date;
    workingDays: number;
}