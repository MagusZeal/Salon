import { Injectable } from '@angular/core';
import { ModalPasswordRecoveryComponent } from './modal-password-recovery.component';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ModalPasswordRecoveryService {

  constructor(public dialog: MatDialog) { }
  modal(){
    this.dialog.open(ModalPasswordRecoveryComponent, {
      width: "600px",
      maxWidth: "600px",
      hasBackdrop: true,
      closeOnNavigation: true
    });
  }
}
