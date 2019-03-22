import { Component, OnInit, ViewChild } from '@angular/core';
import { CajaService } from '../caja/caja.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { BorrarBoletaComponent } from '../componentes/caja/borrar-boleta/borrar-boleta.component';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { animate, style, transition, state, trigger } from '@angular/animations';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CajaComponent implements OnInit {
  breakpoint: number;
  boletas: any[] = [];

  dataSource;
  
  columnsToDisplay: string[] = ['nombre', 'total', 'borrar'];
   // displayedColumns
  @ViewChild(MatPaginator) paginator: MatPaginator;

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
    totalDescuento: 0,
    totalVuelto:0

  };

  constructor(private Caja: CajaService, public dialog: MatDialog) { }

  applyFilter(filterValue: string) {

    this.dataSource.filter = filterValue.trim().toLowerCase();
   

  }
 

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 4 : 8;
  }



  async ngOnInit() {
    this.boletas = [];
 
    this.breakpoint = (window.innerWidth <= 400) ? 4 : 8;

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
      totalDescuento: 0,
      totalVuelto:0

    };

    let c = new Date().toLocaleString('es-CL');
    c = c.substring(6, 10) + c.substring(3, 5) + c.substring(0, 2);


    // this.Caja.obtenerJornada(c).subscribe(o => this.mapearObjetosArray(o));
   

    this.mapearObjetosArray(await this.Caja.obtenerJornada(c));

   

    this.dataSource = new MatTableDataSource<any>(this.boletas);
    this.dataSource.filterPredicate = (data, filter: string)  => {
      const accumulator = (currentTerm, key) => {
        return this.nestedFilterCheck(currentTerm, data, key);
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      // Transform the filter by converting it to lowercase and removing whitespace.
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };
    this.dataSource.paginator = this.paginator;


 
  
  }


  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }


  mapearObjetosArray(objeto) {

    for (let key in objeto) {


      let boleta = objeto[key];
      boleta['idBoleta'] = key;

      this.resumenDia.totalDia += boleta.montoPrincipal + boleta.montoGiftCard +
        boleta.montoDescuento + boleta.montoEfectivo - boleta.montoVuelto;
      this.resumenDia.totalVuelto += boleta.montoVuelto;
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


        this.Caja.eliminarBoleta(c, boleta['idBoleta']).subscribe(() => this.ngOnInit());

      }
    })

  }


}
