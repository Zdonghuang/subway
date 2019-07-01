import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ApiListRoutingModule } from './api-list-routing.module';
import { ApiListComponent } from './api-list.component';

@NgModule({
    imports: [CommonModule, ApiListRoutingModule, TranslateModule],
    declarations: [ApiListComponent]
})
export class ApiListModule {}
