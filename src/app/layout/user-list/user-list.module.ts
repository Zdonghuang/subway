import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { UserListRoutingModule } from './user-list-routing.module';
import { UserListComponent } from './user-list.component';

@NgModule({
    imports: [CommonModule, UserListRoutingModule, TranslateModule],
    declarations: [UserListComponent]
})
export class UserListModule {}
