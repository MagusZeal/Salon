import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomPreloadingStrategy } from './custom-preloading-strategy.service';


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
    loadChildren: './cobros-pendientes/cobros-pendientes.module#CobrosPendientesModule' ,data: { preload: true, delay:1000 }
  },
  {
    path: 'Caja',
    loadChildren: './caja/caja.module#CajaModule' ,data: { preload: true, delay:1010 }
  },
  {
    path: 'Dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule' ,data: { preload: true, delay:1020 }
  },
  {
    path: 'AdministrarClientes',
    loadChildren: './adm-clientes/adm-clientes.module#AdmClientesModule',data: { preload: true, delay:1030 }
  },
  {
    path: 'AdministrarServicios',
    loadChildren: './adm-servicios/adm-servicios.module#AdmServiciosModule',data: { preload: true, delay:1040 }
  },
  {
    path: 'DashboardClientes',
    loadChildren: './dashboard-clientes/dashboard-clientes.module#DashboardClientesModule',data: { preload: true, delay:1050 }
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
    RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloadingStrategy})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
