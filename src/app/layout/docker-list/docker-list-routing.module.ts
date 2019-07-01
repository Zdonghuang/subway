import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DockerListComponent } from './docker-list.component';

const routes: Routes = [
    {
        path: '', component: DockerListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DockerListRoutingModule {
}
