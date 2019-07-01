import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserMailboxComponent } from './user-mailbox.component';

const routes: Routes = [
    {
        path: '',
        component: UserMailboxComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserMailboxRoutingModule {}
