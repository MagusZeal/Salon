import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardClientesComponent } from './dashboard-clientes.component';

const routes: Routes = [
  {
    path: '',
    component:DashboardClientesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardClientesRoutingModule { }
