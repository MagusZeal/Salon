import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsignarServiciosService {
  _loadServicios = new Subject<any>();
  _openModal = new Subject<any>();
  constructor() { }

  getAsignarServicios():Observable<any>{
    return this._openModal.asObservable();
  }
  show(trabajadoras) {
    this._openModal.next(trabajadoras);
  }
}
