import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rz-slider-filter',
  templateUrl: './slider-filter.component.html',
  styleUrls: ['./slider-filter.component.css']
})
export class SliderFilterComponent implements OnInit {

  @Input() name: String;
  @Input() max: string;
  @Input() min: string;
  @Input() step: String;
  @Input() value: String = '0';

  @Input() autoTicks: Boolean = true;
  @Input() disabled: Boolean = false;
  @Input() thumbLabel: Boolean = true;
  @Input() vertical: Boolean = false;

  @Output() sliderValueChanged = new EventEmitter<number>();

  selectedValue: number;

  tickInterval= 'auto';

  constructor() { }

  ngOnInit() {
  }

  emitValue() {
    this.sliderValueChanged.emit(this.selectedValue);
  }

  setValue(v) {
    console.log(':::::',v.value);
    let tempVal = parseFloat(v.value) || parseFloat(v.value.substr(1, v.value.length));
    if (tempVal > parseFloat(this.max)) {
      this.selectedValue = parseFloat(this.max);
    }
    else if (tempVal < parseFloat(this.min)) {
      this.selectedValue = parseFloat(this.min);
    } else {
      this.selectedValue = tempVal;
    }
    this.emitValue();
  }

}
