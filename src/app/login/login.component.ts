import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service.js';
import { MatDialog } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { ModalPasswordRecoveryComponent } from '../componentes/login/modal-password-recovery/modal-password-recovery.component.js';

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
  constructor(public user : UserService, public afAuth: AngularFireAuth, private fb: FormBuilder, public dialog: MatDialog, private router:Router) { }

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
  this.dialog.open(ModalPasswordRecoveryComponent, {

    width: "600px",
    maxWidth: "600px",
    hasBackdrop: true,
    closeOnNavigation: true
  });
 }
}

