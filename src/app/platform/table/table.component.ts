import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'rz-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less', './table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() tableData: {headers: String[], values: String};
  @Input() queryStatus: {success: boolean, inProgress: boolean, newQuery:boolean} = {success: false, inProgress: false, newQuery: false};
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
      this.paginationOptions.totalPages = Math.floor(totObs / obsPP + Math.min(totObs % obsPP, 1));
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

  customPage(i:number) {
    this.paginationOptions.currentPage = i;
    this.updatePaginationOptions();
  }

  updatePaginationOptions() {
    if (this.queryStatus.newQuery === true) {
      this.paginationOptions.currentPage = 0;
      this.queryStatus.newQuery = false;
    }
    this.paginationOptions.totalRecords = this.tableData.values.length;
    const totObs = this.paginationOptions.totalRecords;
    const obsPP = this.paginationOptions.obsPerPage;
    this.paginationOptions.totalPages = Math.floor(totObs / obsPP + Math.min(totObs % obsPP, 1));

    console.log('ONCHANGES TABLE: ', this.paginationOptions.totalRecords, this.paginationOptions.totalPages);
    console.log(this.renderedObs.first(), this.renderedObs.last());
  }

  createRange(){
    let items: number[] = [];
    let startIndex =  Math.max(0, this.paginationOptions.currentPage - 4);
    let endIndex = Math.min(this.paginationOptions.totalPages, startIndex + 9);
    for(let i = startIndex; i < endIndex ; i++){
      items.push(i);
    }
    console.log(items, this.paginationOptions.currentPage);
    return items;
  }

  createPaginationSummary() {
    return `Rows ${this.paginationOptions.currentPage * this.paginationOptions.obsPerPage + 1}-
      ${Math.min(this.paginationOptions.currentPage * this.paginationOptions.obsPerPage + this.paginationOptions.obsPerPage, this.paginationOptions.totalRecords)}
      (${this.paginationOptions.totalRecords} Total)`;

  }

}
