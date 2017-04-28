import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rz-checkbox-filter',
  templateUrl: './checkbox-filter.component.html',
  styleUrls: ['./checkbox-filter.component.css']
})
export class CheckboxFilterComponent implements OnInit {

  @Input() name: String;
  @Input() checkBoxValues: {label: String, value: Boolean}[];

  @Output() selectedValues = new EventEmitter<String[]>();

  selectAll = true;

  constructor() { }

  ngOnInit() {

  }



  emitValues() {
    let vals = [];
    this.checkBoxValues.forEach( elem => elem.value ? vals.push(elem.label) : '');
    this.selectedValues.emit(vals);
  }

  toggleAll() {
    console.log(this.selectAll);
    this.checkBoxValues.forEach( elem => elem.value = this.selectAll );
    console.log(this.checkBoxValues);
    this.emitValues();
  }

}
