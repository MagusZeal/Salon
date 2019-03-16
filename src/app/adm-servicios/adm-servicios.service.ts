import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdmServiciosService {

  constructor(private http: HttpClient) { }

 async obtenerServicios() {

    return await this.http.get<any[]>('https://devs-c9cdc.firebaseio.com/servicios.json?').toPromise();
  }

}
