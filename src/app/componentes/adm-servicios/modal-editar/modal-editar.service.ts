import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModalEditarService {

  constructor(private http: HttpClient) { }

  obtenerCategorias() {

    return this.http.get<any[]>('categorias.json?');

  }

  async editarServicio(servicio, id) {



    return await this.http.put<any[]>(`servicios/${id}.json`, servicio).toPromise();

  }
}
