import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { TranslateModule } from '@ngx-translate/core';
import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { UserDashboardComponent } from './user-dashboard.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [CommonModule, Ng2Charts, UserDashboardRoutingModule, PageHeaderModule, TranslateModule],
    declarations: [UserDashboardComponent]
})
export class UserDashboardModule {}
