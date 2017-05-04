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
  totalRecords: number;

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

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.totalRecords = this.tableData ? this.tableData.values.length : 0;
    console.log("ONCHANGES TABLE: ", this.totalRecords);
  }

  test() {
    console.log(this.tableData);
  }


}
