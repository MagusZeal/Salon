import { Component, OnInit } from '@angular/core';
import { CajaService } from '../caja/caja.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { BorrarBoletaComponent } from '../componentes/caja/borrar-boleta/borrar-boleta.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.scss']
})
export class CajaComponent implements OnInit {
  breakpoint: number;
  boletas: any[] = [];
  boletasFiltradas: any[] = [];
  boletaSeleccionada: any;
  myControl = new FormControl();
  options: any[] = [];
  filteredOptions: Observable<string[]>;
  nombre;
  resumenDia = {

    serviciosRealizados: 0,
    totalDia: 0,
    totalDiaConBase: 0,
    clientesAtendidos: 0,
    totalTransbank: 0,
    totalDebito: 0,
    totalCredito: 0,
    totalTransferencia: 0,
    totalEfectivo: 0,
    totalGiftCard: 0,
    totalDescuento: 0

  };

  constructor(private Caja: CajaService, public dialog: MatDialog) { }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 4 : 7;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    // this.boletasFiltradas = this.boletas.filter(o => o.cliente.nombre.toLocaleLowerCase().includes(value.toLocaleLowerCase()))

    return this.options.filter(o => o.toLowerCase().includes(filterValue));
  }

  async ngOnInit() {
    this.boletas = [];
    this.boletasFiltradas = [];
    this.options= [];

    this.breakpoint = (window.innerWidth <= 400) ? 4 : 7;
  
    this.resumenDia = {

      serviciosRealizados: 0,
      totalDia: 0,
      totalDiaConBase: 0,
      clientesAtendidos: 0,
      totalTransbank: 0,
      totalDebito: 0,
      totalCredito: 0,
      totalTransferencia: 0,
      totalEfectivo: 0,
      totalGiftCard: 0,
      totalDescuento: 0

    };

    let c = new Date().toLocaleString('es-CL');
    c = c.substring(6, 10) + c.substring(3, 5) + c.substring(0, 2);


    // this.Caja.obtenerJornada(c).subscribe(o => this.mapearObjetosArray(o));

    await this.Caja.obtenerJornada(c).subscribe(o => {
      this.mapearObjetosArray(o)
      console.log(o);
    });

    this.options = this.boletas.map(o => o.cliente.nombre);


    this.boletasFiltradas = this.boletas;

    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );

  }



  mapearObjetosArray(objeto) {

    for (let key in objeto) {


      let boleta = objeto[key];
      boleta['idBoleta'] = key;

      this.resumenDia.totalDia += boleta.montoPrincipal + boleta.montoGiftCard +
        boleta.montoDescuento + boleta.montoEfectivo - boleta.montoVuelto;

      switch (boleta.formaDePagoPrincipal) {
        case 'Efectivo':

          this.resumenDia.totalEfectivo += boleta.montoPrincipal - boleta.montoVuelto;
          this.resumenDia.totalGiftCard += boleta.montoGiftCard;
          this.resumenDia.totalDescuento += boleta.montoDescuento;
          break;
        case 'Tarjeta de Crédito':
          this.resumenDia.totalCredito += boleta.montoPrincipal;
          this.resumenDia.totalEfectivo += boleta.montoEfectivo - boleta.montoVuelto;
          this.resumenDia.totalGiftCard += boleta.montoGiftCard;
          this.resumenDia.totalDescuento += boleta.montoDescuento;

          break;
        case 'Tarjeta de Débito':

          this.resumenDia.totalDebito += boleta.montoPrincipal;
          this.resumenDia.totalEfectivo += boleta.montoEfectivo - boleta.montoVuelto;
          this.resumenDia.totalGiftCard += boleta.montoGiftCard;
          this.resumenDia.totalDescuento += boleta.montoDescuento;

          break;
        case 'Transferencia':

          this.resumenDia.totalTransferencia += boleta.montoPrincipal;
          this.resumenDia.totalGiftCard += boleta.montoGiftCard;
          this.resumenDia.totalDescuento += boleta.montoDescuento;

          break;
        case 'Gift Card':
          this.resumenDia.totalGiftCard += boleta.montoPrincipal;
          this.resumenDia.totalDescuento += boleta.montoDescuento;
        default:

          break;
      }

      this.boletas.push(boleta);
    }
  }

  seleccionarBoleta(boleta) {

    this.boletaSeleccionada = boleta;
    console.log(this.boletaSeleccionada);
  }

 

  modalBorrarBoleta(boleta) {
    let c = new Date().toLocaleString('es-CL');
    c = c.substring(6, 10) + c.substring(3, 5) + c.substring(0, 2);


    const dialogRef = this.dialog.open(BorrarBoletaComponent, {
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
       console.log(c);
       
        console.log(boleta['idBoleta']);


        this.Caja.eliminarBoleta(c , boleta['idBoleta']).subscribe(() => this.ngOnInit());
    
      }
    })

  }


}
