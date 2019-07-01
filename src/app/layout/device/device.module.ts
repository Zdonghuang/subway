import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DeviceRoutingModule } from './device-routing.module';
import { DeviceComponent } from './device.component';
import { PageHeaderModule } from '../../shared';
import { DeviceService } from '../../services/device.service';

@NgModule({
    imports: [CommonModule, DeviceRoutingModule, PageHeaderModule, TranslateModule],
    declarations: [DeviceComponent],
    providers: [DeviceService]
})
export class DeviceModule {}
