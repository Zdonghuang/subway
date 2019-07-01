import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { UserRightsRoutingModule } from './user-rights-routing.module';
import { UserRightsComponent } from './user-rights.component';

@NgModule({
    imports: [CommonModule, UserRightsRoutingModule, TranslateModule],
    declarations: [UserRightsComponent]
})
export class UserRightsModule {}
