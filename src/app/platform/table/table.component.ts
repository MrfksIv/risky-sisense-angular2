import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rz-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() tableData: {};

  constructor() { }

  ngOnInit() {
  }

  test() {
    console.log(this.tableData);
  }
}
