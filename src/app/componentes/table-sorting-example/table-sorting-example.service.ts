import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TableSortingExampleService {
  _data = new Subject<any>();

  constructor(private http: HttpClient) { }

  getDataObserver(): Observable<any> {

    return this._data.asObservable();

  }


  cargarDatos(datos) {

    this._data.next(datos);

  }
  
}
