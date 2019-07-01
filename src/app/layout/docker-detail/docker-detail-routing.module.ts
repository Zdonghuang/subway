import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DockerDetailComponent } from './docker-detail.component';

const routes: Routes = [
  {
    path: ':id', component: DockerDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DockerDetailRoutingModule { }
