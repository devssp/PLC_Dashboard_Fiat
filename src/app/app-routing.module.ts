import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './modules/general/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'plc-dashboard/:id', component: DashboardComponent, },
  { path: '**', redirectTo: '/plc-dashboard/0', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: true
  })],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
