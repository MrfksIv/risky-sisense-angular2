import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SliderFilterComponent } from '../slider-filter/slider-filter.component';
import { CheckboxFilterComponent } from '../checkbox-filter/checkbox-filter.component';
import { RFMFilter } from '../checkbox-filter/rfm-filter.class';

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
  @Output() doneIndicatorQuery = new EventEmitter<{lostCusts: number, lostSales: number}>();

  recency: RFMFilter;
  frequency: RFMFilter;
  monetary: RFMFilter;

  RFMFiltersArray: RFMFilter[];
  avgSpendingFilterValue = 0;

  customerCountIndicator: number;
  lostSalesIndicator: number;

  constructor(private qs: QueryService) { }

  ngOnInit() {
    this.recency = new RFMFilter('Recency', GlobalVars.RISKY_TABLE_RECENCY_COLUMN);
    this.frequency = new RFMFilter('Frequency', GlobalVars.RISKY_TABLE_FREQUENCY_COLUMN);
    this.monetary = new RFMFilter('Monetary', GlobalVars.RISKY_TABLE_MONETARY_COLUMN);

    this.RFMFiltersArray = [this.recency, this.frequency, this.monetary];
    this.getSummaryStats();
  }


  getSummaryStats() {
    this.indicatorQueryStatus.emit(true);
     this.qs.getResults(this.RFMFiltersArray, ['Avg_Sales'], this.avgSpendingFilterValue).toPromise()
     .then( (res)=> {
        this.indicatorQueryStatus.emit(false);
        this.lostSalesIndicator = 0;
        let data = res.json();
        this.customerCountIndicator = parseFloat(data.values.length) || 0;

        data.values.forEach( elem => {
          this.lostSalesIndicator += parseFloat(elem);
        });

        this.doneIndicatorQuery.emit({lostCusts:this.customerCountIndicator, lostSales: this.lostSalesIndicator});

         console.log(`${this.lostSalesIndicator} potential sales losses from ${this.customerCountIndicator} customers`)
     }).catch( err => {
       this.indicatorQueryStatus.emit(false);
     });
  }

  getSalesSliderValue(val:number) {
    this.avgSpendingFilterValue = val;

    this.getSummaryStats();
  }

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

  private handleError(error: any): Promise<any> {
    console.log('An error occurred ', error);
    return Promise.reject(error.message || error);
  }

  resetQuery() {
    this.RFMFiltersArray.forEach( elem => {
      elem.resetFilter();
    });
  }

}
