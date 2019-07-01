import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DevContentRoutingModule } from './dev-content-routing.module';
import { DevContentComponent } from './dev-content.component';

@NgModule({
    imports: [CommonModule, DevContentRoutingModule, TranslateModule],
    declarations: [DevContentComponent]
})
export class DevContentModule {}
