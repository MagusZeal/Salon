import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { CobrosPendientesService } from '../cobros-pendientes/cobros-pendientes.service';
import { MatDialog, MatDialogConfig, MatGridList } from '@angular/material';
import { ModalBorrarComponent } from '../componentes/cobros/modal-borrar/modal-borrar.component';
import { ModalPagarComponent } from '../componentes/cobros/modal-pagar/modal-pagar.component';

@Component({
  selector: 'app-cobros-pendientes',
  templateUrl: './cobros-pendientes.component.html',
  styleUrls: ['./cobros-pendientes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CobrosPendientesComponent implements OnInit {

  boletas: IBoleta[] = [];
  boletaSeleccionada: IBoleta;
  breakpoint: number;
  @ViewChild('grid') grid: MatGridList;
  gridByBreakpoint = {
    xl: 8,
    lg: 6,
    md: 4,
    sm: 2,
    xs: 1
  }
  panelOpenState = false;
  constructor(private CobroPendiente: CobrosPendientesService, public dialog: MatDialog) { }

  async ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 2 : 6;
    this.boletas = [];
    await this.CobroPendiente.obtenerBoletas().subscribe(o => {
      this.mapearObjetosArray(o)
    });
  }

  mapearObjetosArray(objeto) {

    for (let key in objeto) {

      let boleta = objeto[key];
      boleta['idBoleta'] = key;
      this.boletas.push(boleta);
    }
  }

  modalPagarBoleta(boleta) {

    const dialogRef = this.dialog.open(ModalPagarComponent, {
      width: "600px",
      maxWidth: "600px",
      maxHeight: "700px",
      autoFocus: true,
      hasBackdrop: true,
      data: {
        boleta: boleta,
      }
    });

  }

  modalBorrarBoleta(boleta) {


    const dialogRef = this.dialog.open(ModalBorrarComponent, {
      width: "600px",
      maxWidth: "600px",
      autoFocus: true,
      hasBackdrop: true,
      data: {
        boleta: boleta
      }
    });
    dialogRef.afterClosed().subscribe(o => {
      if (o == true) {
        this.CobroPendiente.eliminarBoleta(boleta['idBoleta']).subscribe(() => this.ngOnInit());
      }
    })

  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 2 : 6;
  }
}
