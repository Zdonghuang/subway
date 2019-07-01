import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { BackManagementRoutingModule } from './back-management-routing.module';
import { BackManagementComponent } from './back-management.component';

@NgModule({
    imports: [CommonModule, BackManagementRoutingModule, TranslateModule],
    declarations: [BackManagementComponent]
})
export class BackManagementModule {}
