import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'rz-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() tableData: {headers: String[], values: String};
  @Input() queryStatus: {success: boolean, inProgress: boolean} = {success: false, inProgress: false};
  @Input() obsPerPage = 15;

  paginationOptions: {totalRecords: number, obsPerPage: number, currentPage: number, totalPages: number} = {
    totalRecords: undefined,
    obsPerPage: this.obsPerPage,
    currentPage: 0,
    totalPages: undefined
  };

  renderedObs: {first: any, last: any} = {
    first: () => this.paginationOptions.currentPage * this.paginationOptions.obsPerPage ,
    last:  () => this.paginationOptions.currentPage * this.paginationOptions.obsPerPage + this.paginationOptions.obsPerPage
  }


  labels = {
    'cardcode': 'Cardcode',
    'RC_Stores': 'Visited Stores',
    'Totsales': 'Total Sales',
    'TotVisits': 'Total Visits',
    'Meat_Current': 'Meat Market Visits',
    'Bakery_Current': 'Bakery Visits',
    'Fruit_Current': 'Fruit Market Visits',
    'Fish_Current': 'Fish Market Visits',
    'RFM_Current': 'Current RFM Score'
  }

  constructor() { }

  ngOnInit() {
    if(this.tableData) {
      let totObs = this.paginationOptions.totalRecords;
      let obsPP = this.paginationOptions.obsPerPage;
      this.paginationOptions.totalPages = Math.round(totObs / obsPP +  ( (totObs % obsPP) / Math.max(totObs % obsPP, 1))) - 1;
    }
  }

  ngOnChanges() {
    console.log('TABLE CHANGE!');
    if(this.tableData) {
      this.updatePaginationOptions();
    }
  }

  nextPage() {
    if (this.paginationOptions.currentPage < this.paginationOptions.totalPages) {
      this.paginationOptions.currentPage ++;
      this.updatePaginationOptions();
    }
  }

  previousPage() {
    if (this.paginationOptions.currentPage > 0) {
      this.paginationOptions.currentPage --;
      this.updatePaginationOptions();
    }
  }

  updatePaginationOptions() {
    this.paginationOptions.totalRecords = this.tableData.values.length;
    let totObs = this.paginationOptions.totalRecords;
    let obsPP = this.paginationOptions.obsPerPage;
    this.paginationOptions.totalPages = Math.round(totObs / obsPP +  ( (totObs % obsPP) / Math.max(totObs % obsPP, 1)));

    
    console.log("ONCHANGES TABLE: ", this.paginationOptions.totalRecords, this.paginationOptions.totalPages);
    console.log(this.renderedObs.first(), this.renderedObs.last());
  }

  test(){
    console.log("WORKS!!!");
  }
}
