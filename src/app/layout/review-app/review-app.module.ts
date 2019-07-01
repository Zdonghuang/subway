import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReviewAppRoutingModule } from './review-app-routing.module';
import { ReviewAppComponent } from './review-app.component';

@NgModule({
    imports: [CommonModule, ReviewAppRoutingModule, TranslateModule],
    declarations: [ReviewAppComponent]
})
export class ReviewAppModule {}
