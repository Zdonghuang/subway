import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevContentComponent } from './dev-content.component';

const routes: Routes = [
    {
        path: '',
        component: DevContentComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DevContentRoutingModule {}
