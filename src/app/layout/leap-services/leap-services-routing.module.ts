import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeapServicesComponent } from './leap-services.component';
const routes: Routes = [
  {
    path: '', component: LeapServicesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeapServicesRoutingModule { }
