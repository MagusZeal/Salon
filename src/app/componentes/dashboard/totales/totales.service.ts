import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TotalesService {
private jornadas = new Subject<any>();
 

  constructor(private http:HttpClient) { }


  obtenerDatos() :Observable<any>{

    return this.jornadas.asObservable();
  }




obtenerJornadas(fechaInicio,fechaTermino){

    return this.http.get<any[]>(`https://devs-c9cdc.firebaseio.com/jornadas.json?orderBy="$key"&startAt="${fechaInicio}"&endAt="${fechaTermino}"`).subscribe(jornadas=>{
this.jornadas.next(jornadas)
    });
    
  }

}
