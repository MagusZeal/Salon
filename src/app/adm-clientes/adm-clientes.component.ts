import { Component, OnInit } from '@angular/core';
import { AdmClientesService } from '../adm-clientes/adm-clientes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forbiddenNameValidator } from './validaciones';


@Component({
  selector: 'app-adm-clientes',
  templateUrl: './adm-clientes.component.html',
  styleUrls: ['./adm-clientes.component.scss']
})
export class AdmClientesComponent implements OnInit {
  clienteForm: FormGroup;
  clientes: ICliente[] = [];
  clientesFiltrados: ICliente[] = [];
  clienteFiltrado: {};
  nombresClientes: string[] = [];
  dias: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  meses: any[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  constructor(private AdmClientes: AdmClientesService, private fb: FormBuilder) { }

  async ngOnInit() {
    this.clientes = await Object.values(await this.AdmClientes.obtenerClientes());
    this.clientesFiltrados = this.clientes;
    this.nombresClientes = this.clientes.map(o => o.nombre);
    this.clienteForm = this.fb.group({
      nombre:['', [Validators.required, Validators.minLength(2),forbiddenNameValidator(this.clientes) ]],
      numero:[''],
      mail:[''],
      cumple:this.fb.group({
        dia:[''],
        mes:[''],
      }),
      nota:['']
    })
    // this.clienteForm.get('cumple').get('mes').setValue(2);



    
  }

  get nombre() { return this.clienteForm.get('nombre'); }


  async agregarCliente() {
  
    await this.AdmClientes.agregarCliente(this.clienteForm.value);
console.log(this.clienteForm.value);

    }

  

  seleccionarCliente(cliente : ICliente){
    var cli:ICliente;
    // if(cliente.cumple){
    //  cli = {cumple:{dia:'01',mes:'2'},mail:cliente.mail,nombre:cliente.nombre,nota:cliente.nota,numero:cliente.numero}
    //  this.clienteForm.setValue(cli);
    // }else{
      this.clienteForm.setValue(cliente);
    // }
  
    // this.clienteForm.get('nombre').setValue(cliente.nombre);
    // this.clienteForm.get('mail').setValue(cliente.mail);
    // this.clienteForm.get('numero').setValue(cliente.numero);
    // this.clienteForm.get('dia').setValue(cliente.cumple.substring(0,cliente.cumple.indexOf('/')));
    // this.clienteForm.get('mes').setValue(this.conseguirMes(cliente.cumple.substring(cliente.cumple.lastIndexOf('/')+1)));

  }

  conseguirMes(mes) {
    if (mes == 1) { return mes = "Enero" }
    if (mes == 2) { return mes = "Febrero" }
    if (mes == 3) { return mes = "Marzo" }
    if (mes == 4) { return mes = "Abril" }
    if (mes == 5) { return mes = "Mayo" }
    if (mes == 6) { return mes = "Junio" }
    if (mes == 7) { return mes = "Julio" }
    if (mes == 8) { return mes = "Agosto" }
    if (mes == 9) { return mes = "Septiembre" }
    if (mes == 10) { return mes = "Octubre" }
    if (mes == 11) { return mes = "Noviembre" }
    if (mes == 12) { return mes = "Diciembre" }
  }

  filtrarNombre(filtro: string){

    this.clientesFiltrados = this.clientes.filter(o=>o.nombre.includes(filtro))

  }

}
