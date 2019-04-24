import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BoletaSinReservaService } from './boleta-sin-reserva.service';
import { ModalEditarCobrosComponent } from '../modal-editar-cobros/modal-editar-cobros.component';
import { ModalBorrarComponent } from '../modal-borrar/modal-borrar.component';
import { ModalPagarComponent } from '../modal-pagar/modal-pagar.component';
import { AngularFireDatabase} from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-boleta-sin-reserva',
  templateUrl: './boleta-sin-reserva.component.html',
  styleUrls: ['./boleta-sin-reserva.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ]
})
export class BoletaSinReservaComponent implements OnInit {

  boletas: any[] = [];
  fechaHoy = new Date().toLocaleString('es-CL').substring(0, 10);
  columnsToDisplaytab1: string[] = ['cliente', 'total', 'acciones'];
  dataSource;
  @ViewChild('paginatorBoletas') paginatorBoletas: MatPaginator;
  @ViewChild('sortBoletas') sortBoletas: MatSort;
 
  constructor(private service: BoletaSinReservaService,  public dialog: MatDialog, public db: AngularFireDatabase) {  
    db.list('boletasDia').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ idBoleta: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(customers => {
      this.boletas = customers;

      this.dataSource = new MatTableDataSource<any>(this.boletas);
      this.dataSource.paginator = this.paginatorBoletas;
      this.dataSource.sort = this.sortBoletas;
     
      this.dataSource.filterPredicate = (data, filter: string) => {
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

  mapearObjetosArray(objeto) {

    for (let key in objeto) {
    if (objeto[key].fecha.substring(0, 10) == this.fechaHoy) {

        let boleta = objeto[key];
        boleta['idBoleta'] = key;
        this.boletas.push(boleta);

      }

      }
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
          reserva:false,
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
          reserva:false,
          boletaEditar: (JSON.parse(JSON.stringify(boleta)))
        }
      });
      dialogRef.afterClosed().subscribe(o => {
        if (o == true) {
     
        
        }
      })
  
    }
  
    
  }





