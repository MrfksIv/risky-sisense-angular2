import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rz-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.css']
})
export class IndicatorComponent implements OnInit {

  @Input() primary: String;
  @Input() secondary: String;
  @Input() primaryTitle: String;

  @Input() loading: Boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
