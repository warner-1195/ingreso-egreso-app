import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: []
})
export class EstadisticaComponent implements OnInit {


  ingresos: number = 0;
  egresos: number = 0;


  totalIngresos: number = 0;
  totalEgresos: number = 0;

  public doughnutChartLabels: string[] = [ 'Ingresos', 'Egresos' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: [this.totalIngresos,this.totalEgresos] }]
  };
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private store : Store<AppState>) { }

  ngOnInit(): void {

    this.store.select('ingresosEgresos').subscribe( ({items}) => this.generarEstadistica(items) )
  }


  generarEstadistica(items : IngresoEgreso[]){

    this.totalEgresos  = 0;
    this.totalIngresos = 0;
    this.egresos       = 0;
    this.ingresos      = 0;

    for (const item of items) {
      if(item.tipo === 'ingreso'){
        this.totalIngresos += item.monto;
        this.ingresos+= Number(item.monto);
      }else{
        this.totalEgresos += item.monto;
        this.egresos+= Number(item.monto);
      }
    }

    this.doughnutChartData.datasets[0].data[0] = this.totalIngresos;
    this.doughnutChartData.datasets[0].data[1] = this.totalEgresos;

  }

 
 
}
