import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaServiciosComponent } from './lista-servicios/lista-servicios.component';
import { CobrosPendientesComponent } from './cobros-pendientes/cobros-pendientes.component';
import { CajaComponent } from './caja/caja.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdmClientesComponent } from './adm-clientes/adm-clientes.component'
import { AdmServiciosComponent} from './adm-servicios/adm-servicios.component'
import { DashboardClientesComponent } from'./dashboard-clientes/dashboard-clientes.component'
const routes: Routes = [
  {path:'Servicios', component:ListaServiciosComponent},
  {path:'CobrosPendientes', component:CobrosPendientesComponent},
  {path:'Caja', component:CajaComponent},
  {path:'Dashboard', component:DashboardComponent},
  {path:'AdministrarClientes', component:AdmClientesComponent},
  {path:'AdministrarServicios', component:AdmServiciosComponent},
  {path:'DashboardClientes', component:DashboardClientesComponent},
  {path:'**', component:ListaServiciosComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
