import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EspecificoTrabajadoraService {
  private jornadas = new Subject<any>();
 
  constructor(private http:HttpClient) { }


  obtenerDatos() :Observable<any>{

    return this.jornadas.asObservable();
  }




obtenerJornadas(fechaInicio,fechaTermino, trabajadora){

    return this.http.get<any[]>(`https://devs-c9cdc.firebaseio.com/jornadas.json?orderBy="$key"&startAt="${fechaInicio}"&endAt="${fechaTermino}"`).subscribe(jornadas=>{
this.jornadas.next({trabajadora:trabajadora, jornadas:jornadas})

    });
    
  }



}
