import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CobrosPendientesComponent } from './cobros-pendientes.component';
import { BoletaSinReservaComponent } from '../componentes/cobros/boleta-sin-reserva/boleta-sin-reserva.component';
import { BoletaReservaDiaComponent } from '../componentes/cobros/boleta-reserva-dia/boleta-reserva-dia.component';
import { BoletaReservasFuturasComponent } from '../componentes/cobros/boleta-reservas-futuras/boleta-reservas-futuras.component';

const routes: Routes = [
  { path: '', component: CobrosPendientesComponent, 
  children: [
    { path: '', redirectTo: 'sinreserva' },
    { path: 'sinreserva', component: BoletaSinReservaComponent, data: { label: 'Sin Reserva' } },
    { path: 'reservasdia', component: BoletaReservaDiaComponent, data: { label: 'Reserva del Dia' } },
    { path: 'reservasfuturas', component: BoletaReservasFuturasComponent, data: { label: 'Reserva Futuras' } },
  

  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CobrosPendientesRoutingModule { }
