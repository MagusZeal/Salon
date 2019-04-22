import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { LoginComponent } from 'src/app/login/login.component';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-modal-password-recovery',
  templateUrl: './modal-password-recovery.component.html',
  styleUrls: ['./modal-password-recovery.component.scss']
})
export class ModalPasswordRecoveryComponent implements OnInit {
  correo = new FormControl('', [Validators.required, Validators.email]);
  floatLabel = "always";
  constructor(public user: UserService, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit() {
  }
  enviarCorreo() {
    if (this.correo.valid) {
      this.openSnackBar("Pronto se le enviara un Correo ✉ para resetear su contraseña 🔑", "Ok");
      this.user.passwordRecovery(this.correo.value);
      this.dialogRef.close();
    }


  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }
}
