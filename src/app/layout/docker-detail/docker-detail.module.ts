import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DockerDetailRoutingModule } from './docker-detail-routing.module';
import { DockerDetailComponent } from './docker-detail.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    DockerDetailRoutingModule,
    TranslateModule,
    NgbModule.forRoot()
  ],
  declarations: [DockerDetailComponent]
})
export class DockerDetailModule { }
