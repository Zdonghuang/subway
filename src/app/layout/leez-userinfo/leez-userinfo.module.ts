import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LeezInfoRoutingModule } from './leez-userinfo-routing.module';
import { LeezInfoComponent } from './leez-userinfo.component';

@NgModule({
    imports: [CommonModule, LeezInfoRoutingModule, TranslateModule],
    declarations: [LeezInfoComponent]
})
export class LeezInfoModule {}
