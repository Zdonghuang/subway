import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { CertsComponent } from './certs/certs.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'user-list', pathMatch: 'prefix' },
            { path: 'devops', loadChildren: './devops/devops.module#DevopsModule' },
            { path: 'docker-overview', loadChildren: './docker-overview/docker-overview.module#DockerOverviewModule' },
            { path: 'docker-list', loadChildren: './docker-list/docker-list.module#DockerListModule' },
            { path: 'leap-services', loadChildren: './leap-services/leap-services.module#LeapServicesModule' },
            { path: 'docker-detail', loadChildren: './docker-detail/docker-detail.module#DockerDetailModule' },
            { path: 'user-list', loadChildren: './user-list/user-list.module#UserListModule' },
            { path: 'user-rights', loadChildren: './user-rights/user-rights.module#UserRightsModule' },
            { path: 'review-app', loadChildren: './review-app/review-app.module#ReviewAppModule' },
            { path: 'api-list', loadChildren: './api-list/api-list.module#ApiListModule' },
            { path: 'dev-content', loadChildren: './dev-content/dev-content.module#DevContentModule' },
            { path: 'back-management', loadChildren: './back-management/back-management.module#BackManagementModule' },
            { path: 'user-dashboard', loadChildren: './user-dashboard/user-dashboard.module#UserDashboardModule' },
            { path: 'user-mailbox', loadChildren: './user-mailbox/user-mailbox.module#UserMailboxModule' },
            { path: 'leez-info', loadChildren: './leez-userinfo/leez-userinfo.module#LeezInfoModule' },
            { path: 'device', loadChildren: './device/device.module#DeviceModule' },
            { path: 'backend', loadChildren: './backEnd-git/backEnd-git.module#BackendGitModule' },
            { path: 'settings', loadChildren: './settings/settings.module#SettingsModule' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
            { path: 'certs', component: CertsComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
