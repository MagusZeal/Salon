import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaServiciosComponent } from './lista-servicios.component'

const routes: Routes = [
  {
    path: '',
    component: ListaServiciosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaServiciosRoutingModule { }
