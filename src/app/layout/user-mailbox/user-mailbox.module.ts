import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { UserMailboxRoutingModule } from './user-mailbox-routing.module';
import { UserMailboxComponent } from './user-mailbox.component';

@NgModule({
    imports: [CommonModule, UserMailboxRoutingModule, TranslateModule],
    declarations: [UserMailboxComponent]
})
export class UserMailboxModule {}
