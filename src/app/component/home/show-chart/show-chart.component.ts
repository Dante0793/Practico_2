import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ChartConfiguration } from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import { BusinessDataService } from 'src/app/services/business-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-show-chart',
  templateUrl: './show-chart.component.html',
  styleUrls: ['./show-chart.component.scss'],
})
export class ShowChartComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public businessData: BusinessDataService,
    public route: Router, 
  ) {}

  chartType: any = [];
  public pieChartLabels: any = [];
  pieValues: any = [];
  pieChartDatasets: any;
  years: any = []; //hashmap keys
  selectedYear = '';
  allMonths:any=[];
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels:[],
    datasets:[],
  };

  onHome(){
    this.businessData.pieDialogRef.close();
    this.businessData.onHome();
  }

  ngOnInit(): void {
    this.chartType = this.businessData.chartType;
    this.pieChartLabels = this.businessData.pieLabels;
    this.pieChartDatasets = [
      {
        data: this.businessData.piedata,
      },
    ];
    this.years=[];
    for(let key in this.businessData.hashmap){
      this.years.push(key)
    }
  }

  onSelectionChange(event:any){
    this.allMonths={
      'Ene':0,
      'Feb':0,
      'Mar':0,
      'Abr':0,
      'May':0,
      'Jun':0,
      'Jul':0,
      'Ago':0,
      'Sep':0,
      'Oct':0,
      'Nov':0,
      'Dic':0,
    };
    const data=this.businessData.hashmap[event.value];
    for(let entry of data){
      this.allMonths[entry[0]]+=entry[1];
    }
    let vals:any=[];
    for(let key in this.allMonths){
      vals.push(this.allMonths[key]);
    }
    this.barChartData= {
      labels: [
        'Ene',
        'Feb',
        'Mar',
        'Abr',
        'May',
        'Jun',
        'Jul',
        'Ago',
        'Sep',
        'Oct',
        'Nov',
        'Dic',
      ],
      datasets: [
        {
          data: vals,
          label: event.value,
        },
      ],
    };
  }

  public pieChartLegend = true;
  public pieChartPlugins = [];

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
}
