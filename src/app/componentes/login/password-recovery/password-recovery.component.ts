import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { LoginComponent } from 'src/app/login/login.component';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data: any ,
  private dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit() {
  }

}
