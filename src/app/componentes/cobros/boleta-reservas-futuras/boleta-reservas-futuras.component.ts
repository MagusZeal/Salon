import { Component, OnInit, ViewChild } from '@angular/core';
import { BoletaReservasFuturasService } from './boleta-reservas-futuras.service';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { ModalEditarCobrosComponent } from '../modal-editar-cobros/modal-editar-cobros.component';
import { ModalBorrarComponent } from '../modal-borrar/modal-borrar.component';
import { ModalPagarComponent } from '../modal-pagar/modal-pagar.component';
import { trigger, style, animate, transition, state } from '@angular/animations';

@Component({
  selector: 'app-boleta-reservas-futuras',
  templateUrl: './boleta-reservas-futuras.component.html',
  styleUrls: ['./boleta-reservas-futuras.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ]
})
export class BoletaReservasFuturasComponent implements OnInit {
  dataSourceFuturas;
  boletasReservadasFuturas: any[] = [];
  fechaHoy = new Date().toLocaleString('es-CL').substring(0, 10);
  @ViewChild('paginatorFuturas') paginatorFuturas: MatPaginator;
  @ViewChild('sortFuturas') sortFuturas: MatSort;
  columnsToDisplaytab3: string[] = ['fecha', 'cliente', 'acciones'];
  constructor(private service: BoletaReservasFuturasService, public dialog: MatDialog, public db: AngularFireDatabase) {
    db.list('boletasReserva').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ idBoleta: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(customers => {
      
      this.boletasReservadasFuturas = customers;
console.log(this.boletasReservadasFuturas);

      this.boletasReservadasFuturas = this.boletasReservadasFuturas.filter(o =>
        (o.fecha.substring(6, 10) + o.fecha.substring(3, 5) + o.fecha.substring(0, 2)) >
        (this.fechaHoy.substring(6, 10) + this.fechaHoy.substring(3, 5) + this.fechaHoy.substring(0, 2)));
      this.dataSourceFuturas = new MatTableDataSource<any>(this.boletasReservadasFuturas);
      this.dataSourceFuturas.paginator = this.paginatorFuturas;
      this.sortFuturas.direction = 'asc';
      this.sortFuturas.active = 'fecha';
      this.dataSourceFuturas.sort = this.sortFuturas;

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
      this.dataSourceFuturas.filterPredicate = (data, filter: string) => {
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


  ngOnInit() {



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

}
