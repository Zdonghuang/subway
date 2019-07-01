import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from './../../shared';
import { TranslateModule } from '@ngx-translate/core';
import { LeapServicesRoutingModule } from './leap-services-routing.module';
import { LeapServicesComponent } from './leap-services.component';

@NgModule({
  imports: [
    CommonModule,
    LeapServicesRoutingModule,
    PageHeaderModule,
    TranslateModule
  ],
  declarations: [LeapServicesComponent]
})
export class LeapServicesModule { }
