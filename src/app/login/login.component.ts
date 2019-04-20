import { Component, OnInit, NgModule } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service.js';
import { MatDialog } from '@angular/material';
import { PasswordRecoveryComponent } from '../componentes/login/password-recovery/password-recovery.component.js';
import { ModalPasswordRecoveryComponent } from '../componentes/login/modal-password-recovery/modal-password-recovery.component.js';
import { ModalPasswordRecoveryService } from '../componentes/login/modal-password-recovery/modal-password-recovery.service.js';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  floatLabel="always";
  loginForm: FormGroup = this.fb.group({
    email: ['',[Validators.required]],
    password: ['',[Validators.required]]
  });
  email = new FormControl('', [Validators.required]);
  password = new FormControl('',[Validators.required]);
  constructor(public user : UserService, public afAuth: AngularFireAuth, private fb: FormBuilder, public dialog: MatDialog, public service: ModalPasswordRecoveryService, private router:Router) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.router.navigate([''])
      } else {
        this.router.navigate(['/Login'])
      }
    });
    
  }
login(){

  
  if(this.loginForm.valid){
  this.user.login(this.loginForm.value.email,this.loginForm.value.password);
  }
}

passwordRecovery(){
this.service.modal();
 
  
}


}

