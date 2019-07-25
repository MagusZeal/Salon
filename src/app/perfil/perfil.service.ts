import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http:HttpClient) { }

  obtenerTrabajadoras() {

    return this.http.get<any[]>('trabajadoras.json?');
  }
  

  pico(){
    console.log('laweagay');
    
  }
}
