import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRightsComponent } from './user-rights.component';

const routes: Routes = [
    {
        path: '',
        component: UserRightsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRightsRoutingModule {}
