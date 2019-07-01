import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { BackendGitRoutingModule } from './backEnd-git-routing.module';
import { BackendGitComponent } from './backEnd-git.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [CommonModule, BackendGitRoutingModule, PageHeaderModule, TranslateModule],
    declarations: [BackendGitComponent],
    providers: []
})
export class BackendGitModule {}
