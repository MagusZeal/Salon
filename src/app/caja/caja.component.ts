import { Component, OnInit, ViewChild } from '@angular/core';
import { CajaService } from '../caja/caja.service';
import { BorrarBoletaComponent } from '../componentes/caja/borrar-boleta/borrar-boleta.component';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { animate, style, transition, state, trigger } from '@angular/animations';
import { ICajaComponent } from './interfaz/ICajaComponent';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})
export class CajaComponent implements OnInit {
  CajaComponentClass: ICajaComponent;
  breakpoint: number;
  boletas: any[] = [];
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
    totalVuelto: 0,

  }
  dataSource;
  fechaHoy = new Date().toLocaleString('es-CL').substring(0, 10);
  fecha;
  columnsToDisplay: string[] = ['nombre', 'total', 'borrar'];
  boletasboletas: any[] = [];



  @ViewChild(MatPaginator) paginator: MatPaginator;



  constructor(private Caja: CajaService, public dialog: MatDialog, public db: AngularFireDatabase) {
    let c = new Date().toLocaleString('es-CL');
    c = c.substring(6, 10) + c.substring(3, 5) + c.substring(0, 2);
    console.log(c);
    console.log(`jornadas/${c}`);


    db.list(`jornadas/${c}`).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({


          idBoleta: c.payload.key, ...c.payload.val()
        }))
      )
    ).subscribe(customers => {


      this.boletas = customers;
    
      console.log(this.boletas);
   
      this.mapResumenDia(this.boletas)
console.log(this.resumenDia);


      let c = new Date().toLocaleString('es-CL');
      c = c.substring(6, 10) + c.substring(3, 5) + c.substring(0, 2);



      this.dataSource = new MatTableDataSource<any>(this.boletas);
      this.dataSource.paginator = this.paginator;

      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return this.nestedFilterCheck(currentTerm, data, key);
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        // Transform the filter by converting it to lowercase and removing whitespace.
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };


    });
  }

  applyFilter(filterValue: string, dataSource: MatTableDataSource<any>) {

    // this.CajaComponentClass.applyFilter(filterValue, this.dataSource);

    dataSource.filter = filterValue.trim().toLowerCase();


  }


  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 4 : 8;
    // this.CajaComponentClass.onResize(event);
  }



  async ngOnInit() {

    this.breakpoint = (window.innerWidth <= 400) ? 4 : 8;


    history.pushState(null, null, document.URL);

    this.fecha = this.fechaHoy.substring(6, 10) + this.fechaHoy.substring(3, 5) + this.fechaHoy.substring(0, 2);
    this.fecha = this.fecha - 1;

    console.log(1);
    await new Promise(resolve => setTimeout(resolve, 15000)); // 3 sec
    this.mapearBoletasArray(await this.Caja.obtenerBoletasDia(), false);
    this.mapearBoletasArray(await this.Caja.obtenerBoletasReserva(), true);
    console.log(2);


  }
  mapearBoletasArray(objeto, flag) {

    for (let key in objeto) {

      let boleta = objeto[key];
      boleta['idBoleta'] = key;

      var a = boleta.fecha.substring(6, 10) + boleta.fecha.substring(3, 5) + boleta.fecha.substring(0, 2);
      if (a < (this.fecha)) {
        console.log(boleta.fecha);

        if (flag == false) {
          this.Caja.eliminarBoletasDia(boleta['idBoleta']).subscribe();
        } else {
          this.Caja.eliminarBoletasReserva(boleta['idBoleta']).subscribe();
        }
      }
    }
  }

  nestedFilterCheck(search, data, key) {

    return this.CajaComponentClass.GetNestedObjects(search, data, key);

  }


  mapearObjetosArray(objeto) {
    this.CajaComponentClass.MaptoResumenDia(objeto);

  }


  modalBorrarBoleta(boleta) {
    let c = new Date().toLocaleString('es-CL');
    c = c.substring(6, 10) + c.substring(3, 5) + c.substring(0, 2);


    const dialogRef = this.dialog.open(BorrarBoletaComponent, {
      width: "600px",
      maxWidth: "600px",
      autoFocus: true,
      hasBackdrop: true,
      closeOnNavigation: true,
      data: {
        boleta: boleta
      }
    });
    dialogRef.afterClosed().subscribe(o => {
      if (o == true) {
        this.Caja.eliminarBoleta(c, boleta['idBoleta']).subscribe(o => this.ngOnInit());
      }
    })
  }
  mapResumenDia(objeto) {
   this.limpiar();
    for (var i in objeto) {


      let boleta = objeto[i];
   

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

    
  }



    

  }
  limpiar(){
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
      totalVuelto: 0,
  
    }
  }

}
