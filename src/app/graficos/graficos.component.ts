import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { FormControl } from '@angular/forms';
import { GraficosService } from './graficos.service';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent implements OnInit {
  title = 'Ng7ChartJs By DotNet Techy';
  LineChart = [];
  BarChart = [];
  PieChart = [];
  fechaInicio: string;
  fechaTermino: string;
  dpInicio = new FormControl(new Date());
  dpTermino = new FormControl(new Date());
  breakpoint: number;
  boletas: any[] = [];
  jornadas: any[] = [];
  clientesFiltrados =[];
  nombres = [];
  dinero = [];
  serviciosMasRealizados=[];

  constructor(private service: GraficosService,) { }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 2;
  }

serviciosRealizados(boleta){
  for (var i in boleta) {
    for (var z in boleta[i].ordenes) {
      if (!this.serviciosMasRealizados.find(o => o.servicio === boleta[i].ordenes[z].servicio.descripcion)) {
        this.serviciosMasRealizados.push({ servicio: boleta[i].ordenes[z].servicio.descripcion, valorTotal: 0, cantidadServicios: 0 });
      }
      for (var p in this.serviciosMasRealizados) {

        if (this.serviciosMasRealizados[p].servicio == boleta[i].ordenes[z].servicio.descripcion) {
          this.serviciosMasRealizados[p].cantidadServicios += +1;
          this.serviciosMasRealizados[p].valorTotal += boleta[i].ordenes[z].servicio.valor *
            (((boleta[i].ordenes[z].trabajadora.categoriaTrabajadora.find(o => o.categoria === boleta[i].ordenes[z].servicio.categoria).porcentaje) - 100) * (-0.01));

          //   boleta[i].ordenes[z].servicio.valor *  (boleta[i].ordenes[z].trabajadora.categoriaTrabajadora.find(o => o.categoria === boleta[i].ordenes[z].servicio.categoria).porcentaje) * 0.01;
          this.nombres.push(this.serviciosMasRealizados[p].servicio);
          this.dinero.push(this.serviciosMasRealizados[p].valorTotal)
        }

      }
     
    }
  }

}

 async buscar() {

    this.fechaInicio = this.dpInicio.value.toLocaleString('es-CL').substring(6, 10) +
      this.dpInicio.value.toLocaleString('es-CL').substring(3, 5) +
      this.dpInicio.value.toLocaleString('es-CL').substring(0, 2);
    this.fechaTermino = this.dpTermino.value.toLocaleString('es-CL').substring(6, 10) +
      this.dpTermino.value.toLocaleString('es-CL').substring(3, 5) +
      this.dpTermino.value.toLocaleString('es-CL').substring(0, 2);

    this.jornadas = await Object.values(await this.service.obtenerJornadas(this.fechaInicio, this.fechaTermino));
    this.mapearObjetosArray(this.jornadas);
this.serviciosRealizados(this.boletas)

    


      
   

    console.log(this.nombres);
console.log(this.dinero);

  // Bar chart:
  this.BarChart = new Chart('barChart', {
    type: 'bar',
    data: {
      labels: this.nombres,
      datasets: [{
        label: '# of Votes',
        data: this.dinero,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      title: {
        text: "Bar Chart",
        display: true
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
    

  this.LineChart = new Chart('lineChart', {
    type: 'line',
    data: {
      labels: this.nombres,
      datasets: [{
        label: 'Number of Items Sold in Months',
        data: this.dinero,
        fill: false,
        lineTension: 0.2,
        borderColor: "red",
        borderWidth: 1
      }]
    },
    options: {
      title: {
        text: "Line Chart",
        display: true
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });



  // pie chart:
  this.PieChart = new Chart('pieChart', {
    type: 'pie',
    data: {
      labels: this.nombres,
      datasets: [{
        label: '# of Votes',
        data: this.dinero,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      title: {
        text: "Bar Chart",
        display: true
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });





  }
  mapearObjetosArray(objeto) {

    for (var i in objeto) {
      for (var z in objeto[i]) {
        let boleta = objeto[i][z];
        this.boletas.push(boleta);
      }

    }


  }

  ngOnInit() {

    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
   
    this.LineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
          label: 'Number of Items Sold in Months',
          data: [9, 7, 3, 5, 2, 10, 15, 16, 19, 3, 1, 9],
          fill: false,
          lineTension: 0.2,
          borderColor: "red",
          borderWidth: 1
        }]
      },
      options: {
        title: {
          text: "Line Chart",
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

  

    // pie chart:
    this.PieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: '# of Votes',
          data: [9, 7, 3, 5, 2, 10],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          text: "Bar Chart",
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });


  }

}
