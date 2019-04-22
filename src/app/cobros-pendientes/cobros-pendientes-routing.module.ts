import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CobrosPendientesComponent } from './cobros-pendientes.component';

const routes: Routes = [
  {
    path: '',
    component: CobrosPendientesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CobrosPendientesRoutingModule { }
