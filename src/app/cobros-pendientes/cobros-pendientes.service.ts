import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CobrosPendientesService {

  constructor(private http: HttpClient) { }

 async obtenerBoletas() {

    return await this.http.get<any[]>('https://devs-c9cdc.firebaseio.com/boletaCreada.json?').toPromise();
  }

 
}
