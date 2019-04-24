import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, style, state, animate, transition } from '@angular/animations';
import { MatSort, MatPaginator, MatDialog, MatTableDataSource } from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { BoletaReservaDiaService } from './boleta-reserva-dia.service';
import { ModalEditarCobrosComponent } from '../modal-editar-cobros/modal-editar-cobros.component';
import { ModalBorrarComponent } from '../modal-borrar/modal-borrar.component';
import { ModalPagarComponent } from '../modal-pagar/modal-pagar.component';

@Component({
  selector: 'app-boleta-reserva-dia',
  templateUrl: './boleta-reserva-dia.component.html',
  styleUrls: ['./boleta-reserva-dia.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ]
})
export class BoletaReservaDiaComponent implements OnInit {
  boletasReservadas: any[] = [];
  fechaHoy = new Date().toLocaleString('es-CL').substring(0, 10);
  columnsToDisplaytab2: string[] = ['fecha', 'cliente', 'acciones'];
  dataSourceReserva;
  @ViewChild('paginatorReserva') paginatorReserva: MatPaginator;
  @ViewChild('sortReserva') sortReserva: MatSort;

  constructor(private service: BoletaReservaDiaService, public dialog: MatDialog, public db: AngularFireDatabase) {
    db.list('boletasReserva').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ idBoleta: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(customers => {
      this.boletasReservadas = customers;
      this.boletasReservadas = this.boletasReservadas.filter(o => o.fecha.substring(0, 10) == this.fechaHoy);
      this.dataSourceReserva = new MatTableDataSource<any>(this.boletasReservadas);
      this.dataSourceReserva.paginator = this.paginatorReserva;

      this.sortReserva.direction = 'asc';
      this.sortReserva.active = 'fecha';
      this.dataSourceReserva.sort = this.sortReserva;

      this.dataSourceReserva.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'fecha': {

            return (`${item.fecha.substring(11, 13)}${item.fecha.substring(14, 16)}`);
          }
          default: {
            return item[property];
          }
        }
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

    });
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

  modalPagarBoleta(boleta) {

    var dialogRef = this.dialog.open(ModalPagarComponent, {
      width: "600px",
      maxWidth: "600px",
      maxHeight: "700px",
      autoFocus: true,
      hasBackdrop: true,
      closeOnNavigation: true,
      data: {
        reserva: true,
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

        this.service.eliminarBoleta(boleta['idBoleta']).subscribe(() => this.ngOnInit());

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
        reserva: true,
        boletaEditar: (JSON.parse(JSON.stringify(boleta)))
      }
    });
    dialogRef.afterClosed().subscribe(o => {
      if (o == true) {
      }
    })

  }


  ngOnInit() {
  }

}
