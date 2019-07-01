import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DockerListRoutingModule } from './docker-list-routing.module';
import { DockerListComponent } from './docker-list.component';
import { PageHeaderModule } from '../../shared';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [CommonModule, DockerListRoutingModule, PageHeaderModule, TranslateModule],
    declarations: [DockerListComponent]
})
export class DockerListModule {}
