import { ICajaComponent } from './ICajaComponent';
import { MatTableDataSource } from '@angular/material';

export class ResumenDia {
    public serviciosRealizados: number;
    public totalDia: number;
    public totalDiaConBase: number;
    public clientesAtendidos: number;
    public totalTransbank: number;
    public totalDebito: number;
    public totalCredito: number;
    public totalTransferencia: number;
    public totalEfectivo: number;
    public totalGiftCard: number;
    public totalDescuento: number;
    public totalVuelto: number;

    constructor() {


        this.serviciosRealizados = 0;
        this.totalDia = 0;
        this.totalDiaConBase = 0;
        this.clientesAtendidos = 0;
        this.totalTransbank = 0;
        this.totalDebito = 0;
        this.totalCredito = 0;
        this.totalTransferencia = 0;
        this.totalEfectivo = 0;
        this.totalGiftCard = 0;
        this.totalDescuento = 0;
        this.totalVuelto = 0;


    }
}
export class CajaComponentClass implements ICajaComponent {
    private breakpoint;
    public resumenDia;

    constructor() {
        this.breakpoint = (window.innerWidth <= 400) ? 4 : 8;
        this.resumenDia = new ResumenDia();
    }

    GetNestedObjects(search, data, key) {
        if (typeof data[key] === 'object') {
            for (const k in data[key]) {
              if (data[key][k] !== null) {
                search = this.GetNestedObjects(search, data[key], k);
              }
            }
          } else {
            search += data[key];
          }
          return search;
    }

    MaptoResumenDia(objeto) {
        let boletas = [];
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

            boletas.push(boleta);
        }
        return boletas;
    }
    applyFilter(filterValue: string, dataSource: MatTableDataSource<any>) {
    
       dataSource.filter = filterValue.trim().toLowerCase();
     }

    onResize(event) {
        this.breakpoint = (event.target.innerWidth <= 400) ? 4 : 8;
    }

    // modalBorrarBoleta(boleta, dialog, BorrarBoletaComponent, CajaService, callback) {
    //     let c = new Date().toLocaleString('es-CL');
    //     c = c.substring(6, 10) + c.substring(3, 5) + c.substring(0, 2);
    
    
    //     const dialogRef = dialog.open(BorrarBoletaComponent, {
    //       width: "600px",
    //       maxWidth: "600px",
    //       autoFocus: true,
    //       hasBackdrop: true,
    //       data: {
    //         boleta: boleta
    //       }
    //     });
    //     dialogRef.afterClosed().subscribe(o => {
    //       if (o == true) {
    //         console.log(c);
    
    //         console.log(boleta['idBoleta']);

    //         CajaService.eliminarBoleta(c, boleta['idBoleta']).subscribe();
        
   
    //       }
    //     })
    
    //  }

    getBreakpoint() {
        return this.breakpoint;
    }
    getResumenDia() {
        return this.resumenDia;
    }
}