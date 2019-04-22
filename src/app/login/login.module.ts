import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalPasswordRecoveryComponent } from '../componentes/login/modal-password-recovery/modal-password-recovery.component.js';
import { MatFormFieldModule, MatGridListModule, MatIconModule, 
  MatToolbarModule, MatDialogModule, MatInputModule, MatButtonModule, } from '@angular/material';
 
@NgModule({
  declarations: [
    LoginComponent,
    ModalPasswordRecoveryComponent,
    
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
  

  ],
  entryComponents: [
    ModalPasswordRecoveryComponent,
    ]
})
export class LoginModule { }
