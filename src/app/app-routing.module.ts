import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


const routes: Routes = [
  {
    path: 'Servicios',
    loadChildren: './lista-servicios/lista-servicios.module#ListaServiciosModule'
  },
  {
    path: 'Login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'CobrosPendientes',
    loadChildren: './cobros-pendientes/cobros-pendientes.module#CobrosPendientesModule'
  },
  {
    path: 'Caja',
    loadChildren: './caja/caja.module#CajaModule'
  },
  {
    path: 'Dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'AdministrarClientes',
    loadChildren: './adm-clientes/adm-clientes.module#AdmClientesModule'
  },
  {
    path: 'AdministrarServicios',
    loadChildren: './adm-servicios/adm-servicios.module#AdmServiciosModule'
  },
  {
    path: 'DashboardClientes',
    loadChildren: './dashboard-clientes/dashboard-clientes.module#DashboardClientesModule'
  },

  {
    path: 'Perfil',
    loadChildren: './perfil/perfil.module#PerfilModule'
  },
  {
    path: '**',
    redirectTo: '/Servicios',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
