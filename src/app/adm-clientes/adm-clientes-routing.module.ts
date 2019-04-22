import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmClientesComponent } from './adm-clientes.component';

const routes: Routes = [
  {
    path: '',
   component: AdmClientesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmClientesRoutingModule { }
