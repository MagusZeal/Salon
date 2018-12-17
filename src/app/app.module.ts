import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaServiciosComponent } from './lista-servicios/lista-servicios.component';
import {ListaServiciosService} from './lista-servicios/lista-servicios.service';
import { FormsModule} from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { CobrosPendientesComponent } from './cobros-pendientes/cobros-pendientes.component';
@NgModule({
  declarations: [
    AppComponent,
    ListaServiciosComponent,
    CobrosPendientesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    TypeaheadModule.forRoot()
  ],
  providers: [ListaServiciosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
