import { MatTableDataSource } from '@angular/material';

export interface ICajaComponent{

    GetNestedObjects(search, data, key)
    MaptoResumenDia(objeto) 
    applyFilter(filterValue: string, dataSource: MatTableDataSource<any>)
    onResize(event) 
 // modalBorrarBoleta(boleta, dialog, BorrarBoletaComponent, CajaService, callback) 
    getResumenDia();
    getBreakpoint();
}







   
     
    
    
