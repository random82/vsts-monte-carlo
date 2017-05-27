import {
    Injectable
} from '@angular/core';

import {
    ProjectSettingsClient
} from './project-settings.client.base';

import {DayOfWeek} from '../model/iteration';
import * as SystemContracts from 'VSS/Common/Contracts/System';
import * as CoreClient from 'TFS/Core/RestClient';
import * as CoreContracts from 'TFS/Core/Contracts';
import * as WorkContracts from 'TFS/Work/Contracts'; 
import * as WorkClient from 'TFS/Work/RestClient';

Injectable();
export class TfsIterationClient extends ProjectSettingsClient {

    private readonly projectId: string;
    private readonly teamContext : CoreContracts.TeamContext;

    constructor() {
        super();
        let webContext : WebContext = VSS.getWebContext();
        this.projectId = webContext.project.id;
        this.teamContext = {
            project: webContext.project.name,
            projectId: webContext.project.id,
            team: webContext.team.name,
            teamId: webContext.team.id
        };
    }

    public async getTeamWorkingDays() : Promise<DayOfWeek[]> {
        const data = await WorkClient.getClient().getTeamSettings(this.teamContext);
        return data.workingDays.map<DayOfWeek>(it => it);
    }
}