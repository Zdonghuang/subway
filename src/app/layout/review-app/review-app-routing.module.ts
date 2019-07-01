import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewAppComponent } from './review-app.component';

const routes: Routes = [
    {
        path: '',
        component: ReviewAppComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReviewAppRoutingModule {}
