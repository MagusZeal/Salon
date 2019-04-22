import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaServiciosComponent } from './lista-servicios.component'
import { AuthGuard } from '../auth.guard';
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
