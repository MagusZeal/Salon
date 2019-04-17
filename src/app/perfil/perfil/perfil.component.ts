import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { PerfilService } from './perfil.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  userId;
  trabajadoras:any[]=[];
  nombreTrabajadora = new FormControl();
  constructor(public user : UserService, public afAuth: AngularFireAuth, public service: PerfilService) { }

async  ngOnInit() {
  this.service.obtenerTrabajadoras().subscribe(o => {
    this.mapearTrabajadorasArray(o);

  });
    this.afAuth.authState.subscribe(user => {
   
      if(user) this.userId = user.uid
  
  
    })  


  }
  mapearTrabajadorasArray(objeto) {

    for (let key in objeto) {

      let trabajadora = objeto[key];
      trabajadora['idTrabajadora'] = key;
      this.trabajadoras.push(trabajadora);
    }
  }
}
