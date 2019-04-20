import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { CobrosPendientesService } from '../cobros-pendientes/cobros-pendientes.service';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ModalBorrarComponent } from '../componentes/cobros/modal-borrar/modal-borrar.component';
import { ModalPagarComponent } from '../componentes/cobros/modal-pagar/modal-pagar.component';
import { trigger, style, state, animate, transition } from '@angular/animations';
import { ModalEditarCobrosComponent } from '../componentes/cobros/modal-editar-cobros/modal-editar-cobros.component';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-cobros-pendientes',
  templateUrl: './cobros-pendientes.component.html',
  styleUrls: ['./cobros-pendientes.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ]
})
export class CobrosPendientesComponent implements OnInit {
 
  
  boletas: any[] = [];
  boletaSeleccionada: IBoleta;
  breakpoint: number;
  customCollapsedHeight;
  customExpandedHeight;
  boletasReservadas: any[] = [];
  fechaHoy = new Date().toLocaleString('es-CL').substring(0, 10);
  columnsToDisplaytab1: string[] = ['cliente', 'total', 'acciones'];
  columnsToDisplaytab2: string[] = ['fecha', 'cliente', 'acciones'];
  columnsToDisplaytab3: string[] = ['fecha', 'cliente', 'acciones'];
  horas = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];
  minutos = ['00', '15', '30', '45'];
  arrayReserva: any[] = [];
  dataSource;
  dataSourceReserva;
  dataSourceFuturas;
  boletasReservadasFuturas: any[] = [];
  @ViewChild('paginatorBoletas') paginatorBoletas: MatPaginator;
  @ViewChild('paginatorReserva') paginatorReserva: MatPaginator;
  @ViewChild('paginatorFuturas') paginatorFuturas: MatPaginator;

  @ViewChild('sortBoletas') sortBoletas: MatSort;
  @ViewChild('sortReserva') sortReserva: MatSort;
  @ViewChild('sortFuturas') sortFuturas: MatSort;

  panelOpenState = false;
  constructor(private CobroPendiente: CobrosPendientesService, public dialog: MatDialog) { }


  _setDataSource(indexNumber) {
    setTimeout(() => {
      switch (indexNumber) {
        case 0:
          !this.dataSource.paginator ? this.dataSource.paginator = this.paginatorBoletas : null;
          !this.dataSource.sort ? this.dataSource.sort = this.sortBoletas : null;

          break;
        case 1:
          !this.dataSourceReserva.paginator ? this.dataSourceReserva.paginator = this.paginatorReserva : null;
          !this.dataSourceReserva.sort ? this.dataSourceReserva.sort = this.sortReserva : null;

          break;
        case 2:
          !this.dataSourceFuturas.paginator ? this.dataSourceFuturas.paginator = this.paginatorFuturas : null;
          !this.dataSourceFuturas.sort ? this.dataSourceFuturas.sort = this.sortFuturas : null;
          break;
      }
    });
  }

  async ngOnInit() {


    history.pushState(null, null, document.URL);
   
    this.breakpoint = (window.innerWidth <= 400) ? 2 : 6;
    this.customCollapsedHeight = (window.innerWidth <= 400) ? '100px' : '40px';
    this.customExpandedHeight = (window.innerWidth <= 400) ? '100px' : '40px';
    this.boletas = [];
    this.boletasReservadas = [];
    this.boletasReservadasFuturas = [];
    this.mapearObjetosArray(await this.CobroPendiente.obtenerBoletas());


    this.dataSource = new MatTableDataSource<any>(this.boletas);
    this.dataSourceReserva = new MatTableDataSource<any>(this.boletasReservadas);
    this.dataSourceFuturas = new MatTableDataSource<any>(this.boletasReservadasFuturas);


    this.dataSource.paginator = this.paginatorBoletas;
    this.dataSourceReserva.paginator = this.paginatorReserva;
    this.dataSourceFuturas.paginator = this.paginatorFuturas;



    this.sortReserva.direction = 'asc';
    this.sortReserva.active = 'fecha';


    this.dataSource.sort = this.sortBoletas;
    this.dataSourceReserva.sort = this.sortReserva;
    this.dataSourceFuturas.sort = this.sortFuturas;

    this.dataSourceReserva.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'fecha': {

          return (`${item.fecha.substring(11, 13)}:${item.fecha.substring(14, 16)}`);
        }
        default: {
          return item[property];
        }
      }
    };
    this.dataSourceFuturas.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'fecha': {

          return (`${item.fecha.substring(6, 10)}-${item.fecha.substring(3, 5)}-${item.fecha.substring(0, 2)}`);
        }
        default: {
          return item[property];
        }
      }
    };


    this.dataSource.filterPredicate = (data, filter: string) => {
      const accumulator = (currentTerm, key) => {
        return this.GetNestedObjects(currentTerm, data, key);
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      // Transform the filter by converting it to lowercase and removing whitespace.
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };

    this.dataSourceReserva.filterPredicate = (data, filter: string) => {
      const accumulator = (currentTerm, key) => {
        return this.GetNestedObjects(currentTerm, data, key);
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      // Transform the filter by converting it to lowercase and removing whitespace.
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };

    this.dataSourceFuturas.filterPredicate = (data, filter: string) => {
      const accumulator = (currentTerm, key) => {
        return this.GetNestedObjects(currentTerm, data, key);
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      // Transform the filter by converting it to lowercase and removing whitespace.
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };

  }
  applyFilter(filterValue: string, dataSource: MatTableDataSource<any>) {

    dataSource.filter = filterValue.trim().toLowerCase();
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


  onResizee(event) {

    this.customCollapsedHeight = (event.target.innerWidth <= 400) ? '100px' : '40px';
    this.customExpandedHeight = (event.target.innerWidth <= 400) ? '100px' : '40px';
  }

  mapearObjetosArray(objeto) {

    for (let key in objeto) {
      if (objeto[key].horaReservada == true && objeto[key].fecha.substring(0, 10) == this.fechaHoy) {

        let boleta = objeto[key];
        boleta['idBoleta'] = key;
        this.boletasReservadas.push(boleta);
      } 
      else if (objeto[key].fecha.substring(0, 10) == this.fechaHoy && objeto[key].horaReservada != true) {

        let boleta = objeto[key];
        boleta['idBoleta'] = key;
        this.boletas.push(boleta);

      }
      else if(objeto[key].fecha.substring(6, 10)+
      objeto[key].fecha.substring(3, 5)+
      objeto[key].fecha.substring(0, 2) 
      > this.fechaHoy.substring(6, 10)+
      this.fechaHoy.substring(3, 5)+
      this.fechaHoy.substring(0, 2) 
      && objeto[key].horaReservada == true) {
        let boleta = objeto[key];
        boleta['idBoleta'] = key;
        this.boletasReservadasFuturas.push(boleta);

      }
    }
    console.log(this.boletas);
    console.log(this.boletasReservadas);
    console.log(this.boletasReservadasFuturas);
    
    
    
  }

  modalPagarBoleta(boleta) {

    var dialogRef =  this.dialog.open(ModalPagarComponent, {
      width: "600px",
      maxWidth: "600px",
      maxHeight: "700px",
      autoFocus: true,
      hasBackdrop: true,
      closeOnNavigation: true,
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
      closeOnNavigation: true,
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

  modalEditarBoleta(boleta) {


    const dialogRef = this.dialog.open(ModalEditarCobrosComponent, {
      width: "800px",
      maxWidth: "800px",
      maxHeight: "700px",
      autoFocus: true,
      hasBackdrop: true,
      closeOnNavigation: true,
      data: {
        boletaEditar: (JSON.parse(JSON.stringify(boleta)))
      }
    });
    dialogRef.afterClosed().subscribe(o => {
      if (o == true) {
         this.ngOnInit();
      }
    })

  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 2 : 6;
  }
}
