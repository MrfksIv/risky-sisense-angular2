import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SliderFilterComponent } from '../slider-filter/slider-filter.component';
import { CheckboxFilterComponent } from '../checkbox-filter/checkbox-filter.component';

import { RFMFilter } from '../checkbox-filter/rfm-filter.class';
import { SliderFilter } from '../slider-filter/slider-filter.class';

import { QueryService } from '../../query/query.service';

import { GlobalVars } from '../../global-vars';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'rz-filter-group',
  templateUrl: './filter-group.component.html',
  styleUrls: ['./filter-group.component.css']
})
export class FilterGroupComponent implements OnInit {

  loadingQuery: Boolean = false;
  rfmFiltersEnabled: Boolean = true;
  avgSpendingFilterEnabled: Boolean = true;
  freshVisitsFilterEnabled: Boolean = true;

  @Output() doneQuery = new EventEmitter<{headers: String[], values: String[]}>();
  @Output() indicatorQueryStatus = new EventEmitter<boolean>();
  @Output() loadingTableInProgress = new EventEmitter<{success: boolean, inProgress: boolean}>();
  @Output() doneIndicatorQuery = new EventEmitter<{lostCusts: number, lostTotalSales: number,  lostFreshSales: number}>();

  @Output() doneTableQuery = new EventEmitter<{}>();

  avgSpending: SliderFilter;

  recency: RFMFilter;
  frequency: RFMFilter;
  monetary: RFMFilter;

  meat: SliderFilter;
  bakery: SliderFilter;
  fish: SliderFilter;
  fruit: SliderFilter;


  RFMFiltersArray: RFMFilter[];
  FreshFiltersArray: SliderFilter[];

  avgSpendingFilterValue = 0;

  customerCountIndicator: number;
  lostTotalSalesIndicator: number;
  lostFreshSalesIndicator: number;

  constructor(private qs: QueryService) { }

  ngOnInit() {

    this.avgSpending = new SliderFilter('Average Spending', GlobalVars.RISKY_TABLE_AVGSALES_COLUMN, 'currency', '0', '1000', '0');

    this.recency = new RFMFilter('Recency', GlobalVars.RISKY_TABLE_RECENCY_COLUMN);
    this.frequency = new RFMFilter('Frequency', GlobalVars.RISKY_TABLE_FREQUENCY_COLUMN);
    this.monetary = new RFMFilter('Monetary', GlobalVars.RISKY_TABLE_MONETARY_COLUMN);

    this.meat = new SliderFilter('Meatmarket Visits', GlobalVars.RISKY_TABLE_MEAT_COLUMN);
    this.bakery = new SliderFilter('Bakery Visits', GlobalVars.RISKY_TABLE_BAKERY_COLUMN);
    this.fish = new SliderFilter('Fishmarket Visits', GlobalVars.RISKY_TABLE_FISH_COLUMN);
    this.fruit = new SliderFilter('Fruitmarket Visits', GlobalVars.RISKY_TABLE_FRUIT_COLUMN);

    this.RFMFiltersArray = [this.recency, this.frequency, this.monetary];
    this.FreshFiltersArray = [this.bakery,  this.fish, this.fruit, this.meat];
    this.getSummaryStats();
  }


  getSummaryStats() {
    // console.log(this.FreshFiltersArray);
    this.indicatorQueryStatus.emit(true);
    this.qs.getResults(this.RFMFiltersArray, this.FreshFiltersArray,
      [GlobalVars.RISKY_TABLE_AVGSALES_COLUMN, GlobalVars.RISKY_TABLE_FRESHSALES_COLUMN], this.avgSpending.selectedVal).toPromise()
     .then( (res) => {
        this.indicatorQueryStatus.emit(false);
        this.lostTotalSalesIndicator = 0;
        this.lostFreshSalesIndicator = 0;
        let data = res.json();

        this.customerCountIndicator = parseFloat(data.values.length) || 0;

        data.values.forEach( elem => {
          this.lostTotalSalesIndicator += parseFloat(elem[0]);
          this.lostFreshSalesIndicator += parseFloat(elem[1]);
        });

        this.doneIndicatorQuery.emit({
          lostCusts: this.customerCountIndicator,
          lostTotalSales: this.lostTotalSalesIndicator,
          lostFreshSales: this.lostFreshSalesIndicator});

        //  console.log(`${this.lostTotalSalesIndicator} potential sales losses from ${this.customerCountIndicator} customers`);
     }).catch( err => {
       this.indicatorQueryStatus.emit(false);
     });
  }


  getTableData() {
    this.loadingTableInProgress.emit({success: undefined, inProgress: true});
    this.qs.getResults(this.RFMFiltersArray, this.FreshFiltersArray,
    GlobalVars.TABLE_DATA_QUERY_COLUMNS, this.avgSpending.selectedVal).toPromise()
    .then( (res) => {
      this.loadingTableInProgress.emit({success: true, inProgress: false});
      this.doneTableQuery.emit(res.json());
    })
    .catch( err => {
      this.loadingTableInProgress.emit({success: false, inProgress: false});
    });
  }
}

/*
  print(evt) {
    console.log('RECENCY:', this.recency.getSelectedValues(), this.recency.enabled);
    console.log('FREQUENCY:', this.frequency.getSelectedValues(), this.frequency.enabled);
    console.log('MONETARY:', this.monetary.getSelectedValues(), this.monetary.enabled);

    this.loadingQuery = true;

    this.qs.getResults(this.RFMFiltersArray, ['cardcode, RFM_Current', 'RFM_Previous'],  this.avgSpendingFilterValue).toPromise()
    .then(res => {
      this.loadingQuery = false;
      this.doneQuery.emit(res.json());
    })
    .catch(this.handleError);
  }
  */
