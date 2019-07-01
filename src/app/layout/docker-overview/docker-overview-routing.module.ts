import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DockerOverviewComponent } from './docker-overview.component';

const routes: Routes = [
    {
        path: '', component: DockerOverviewComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DockerOverviewRoutingModule {
}
