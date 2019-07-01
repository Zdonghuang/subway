import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevopsComponent } from './devops.component';

const routes: Routes = [
    {
        path: '',
        component: DevopsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DevopsRoutingModule {}
