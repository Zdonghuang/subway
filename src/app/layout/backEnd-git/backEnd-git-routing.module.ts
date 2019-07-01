import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackendGitComponent } from './backEnd-git.component';

const routes: Routes = [
    {
        path: '', component: BackendGitComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BackendGitRoutingModule {
}
