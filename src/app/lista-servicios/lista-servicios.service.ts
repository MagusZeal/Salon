import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ListaServiciosService {

  constructor(private http: HttpClient) { }

  obtenerCategorias() {

    return this.http.get<any[]>(`categorias.json?`);

  }

  obtenerServicios() {

    return this.http.get<any[]>('servicios.json?');
  }


}
