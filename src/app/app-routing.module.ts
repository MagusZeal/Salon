import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaServiciosComponent } from './lista-servicios/lista-servicios.component';
import { CobrosPendientesComponent } from './cobros-pendientes/cobros-pendientes.component';

const routes: Routes = [
  {path:'Servicios', component:ListaServiciosComponent},
  {path:'CobrosPendientes', component:CobrosPendientesComponent},
  {path:'**', component:ListaServiciosComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
