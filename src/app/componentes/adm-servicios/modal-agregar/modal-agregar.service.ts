import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ModalAgregarService {

  constructor(private http: HttpClient) { }

  obtenerCategorias() {

    return this.http.get<any[]>('categorias.json?');

  }

  async agregarServicio(servicio) {

    return await this.http.post<any[]>('servicios.json?', servicio).toPromise();

  }
}
