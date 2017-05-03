import { Component, OnInit } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { FilterGroupComponent } from './filter-group/filter-group.component';
import { TableComponent } from './table/table.component';
import { IndicatorComponent } from './indicator/indicator.component';

import { QueryService } from '../query/query.service';
import { Indicator } from './indicator/indicator.class';

@Component({
  selector: 'rz-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.css']
})
export class PlatformComponent implements OnInit {

  private username: String;
  private queryResults: {headers: String[], values: String[]};
  private indicatorResults: {lostCusts: number, lostTotalSales: number, lostFreshSales: number};

  private avgSalesIndicator: Indicator;
  private freshSalesIndicator: Indicator;

  indicatorQueryInProgress: boolean = false;

  constructor(private query: QueryService) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.avgSalesIndicator = new Indicator('Projected Total Sales Loss', 0, 'Customer Count:', 0);
    this.freshSalesIndicator = new Indicator('Total Fresh Sales', 0, 'In the past period');
  }

  getData(queryData){
    this.queryResults = queryData;
    console.log('Received at platform component:');
    console.log(this.queryResults);
  }

  getIndicatorData(indData: {lostCusts: number, lostTotalSales: number, lostFreshSales: number}) {
    this.avgSalesIndicator.setPrimaryValue(indData.lostTotalSales);
    this.avgSalesIndicator.setSecondaryValue(indData.lostCusts);
    this.freshSalesIndicator.setPrimaryValue(indData.lostFreshSales);
    console.log(this.avgSalesIndicator);
  }

  getIndicatorQueryStatus(status) {
    this.indicatorQueryInProgress = status;
    this.updateIndicatorQueryStatus();
  }

  updateIndicatorQueryStatus() {
    this.avgSalesIndicator.setQueryStatus(this.indicatorQueryInProgress);
    this.freshSalesIndicator.setQueryStatus(this.indicatorQueryInProgress);
  }
}
