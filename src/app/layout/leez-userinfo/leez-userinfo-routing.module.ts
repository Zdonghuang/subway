import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeezInfoComponent } from './leez-userinfo.component';

const routes: Routes = [
    {
        path: '',
        component: LeezInfoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LeezInfoRoutingModule {}
