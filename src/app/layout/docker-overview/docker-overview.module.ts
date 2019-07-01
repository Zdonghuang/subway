import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { DockerOverviewRoutingModule } from './docker-overview-routing.module';
import { DockerOverviewComponent } from './docker-overview.component';
import { PageHeaderModule } from './../../shared';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [CommonModule, Ng2Charts, DockerOverviewRoutingModule, PageHeaderModule, TranslateModule],
    declarations: [DockerOverviewComponent]
})
export class DockerOverviewModule {}
