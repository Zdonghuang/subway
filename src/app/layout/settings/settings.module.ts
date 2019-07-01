import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { PageHeaderModule } from './../../shared';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    PageHeaderModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [SettingsComponent]
})
export class SettingsModule { }
