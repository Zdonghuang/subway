import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DevopsRoutingModule } from './devops-routing.module';
import { DevopsComponent } from './devops.component';
import { Observable } from 'rxjs';
import {
  IMqttMessage,
  MqttModule,
  IMqttServiceOptions
} from 'ngx-mqtt';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
};

@NgModule({
    imports: [CommonModule, DevopsRoutingModule,TranslateModule,FormsModule,MqttModule.forRoot(MQTT_SERVICE_OPTIONS)],
    declarations: [DevopsComponent]
})

export class DevopsModule {}
