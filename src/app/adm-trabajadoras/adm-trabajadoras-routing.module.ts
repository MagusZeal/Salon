import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmTrabajadorasComponent } from './adm-trabajadoras.component';

const routes: Routes = [
  {
    path: '',
    component: AdmTrabajadorasComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmTrabajadorasRoutingModule { }
