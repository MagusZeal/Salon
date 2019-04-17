import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaServiciosComponent } from './lista-servicios/lista-servicios.component';
import { CobrosPendientesComponent } from './cobros-pendientes/cobros-pendientes.component';
import { CajaComponent } from './caja/caja.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdmClientesComponent } from './adm-clientes/adm-clientes.component'
import { AdmServiciosComponent } from './adm-servicios/adm-servicios.component'
import { DashboardClientesComponent } from './dashboard-clientes/dashboard-clientes.component'
import { GraficosComponent } from './graficos/graficos.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { PerfilComponent } from './perfil/perfil/perfil.component';

const routes: Routes = [
  { path: '', component: ListaServiciosComponent, canActivate: [AuthGuard] },
  { path: 'Login', component: LoginComponent },
  { path: 'CobrosPendientes', component: CobrosPendientesComponent, canActivate: [AuthGuard] },
  { path: 'Caja', component: CajaComponent, canActivate: [AuthGuard] },
  { path: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'AdministrarClientes', component: AdmClientesComponent, canActivate: [AuthGuard] },
  { path: 'AdministrarServicios', component: AdmServiciosComponent, canActivate: [AuthGuard] },
  { path: 'DashboardClientes', component: DashboardClientesComponent, canActivate: [AuthGuard] },
  { path: 'Graficos', component: GraficosComponent, canActivate: [AuthGuard] },
  { path: 'Perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
