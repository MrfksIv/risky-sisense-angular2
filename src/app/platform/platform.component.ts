import { Component, OnInit } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { FilterGroupComponent } from './filter-group/filter-group.component';
import { TableComponent } from './table/table.component';
import { IndicatorComponent } from './indicator/indicator.component';

import { QueryService } from '../query/query.service';

@Component({
  selector: 'rz-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.css']
})
export class PlatformComponent implements OnInit {

  private username: String;
  private queryResults: {headers: String[], values: String[]};
  private indicatorResults: {lostCusts: number, lostSales: number};
  indicatorQueryInProgress: Boolean = false;

  constructor(private query: QueryService) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
  }

  getData(queryData){
    this.queryResults = queryData;
    console.log("Received at platform component:");
    console.log(this.queryResults);
  }

  getIndicatorData(indData) {
    this.indicatorResults = indData;
    console.log(this.indicatorResults);
  }

  getIndicatorQueryStatus(status) {
    this.indicatorQueryInProgress = status;
  }
}
