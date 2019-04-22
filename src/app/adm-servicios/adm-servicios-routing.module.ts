import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmServiciosComponent } from './adm-servicios.component';

const routes: Routes = [
  {
    path: '',
    component: AdmServiciosComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmServiciosRoutingModule { }
