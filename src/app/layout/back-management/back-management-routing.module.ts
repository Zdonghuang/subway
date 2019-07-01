import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackManagementComponent } from './back-management.component';

const routes: Routes = [
    {
        path: '',
        component: BackManagementComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BackManagementRoutingModule {}
