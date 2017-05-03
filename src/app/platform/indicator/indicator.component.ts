import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rz-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.css']
})
export class IndicatorComponent implements OnInit {

  @Input() primary: string;
  @Input() secondary: string;
  @Input() primaryTitle: string;
  @Input() secondaryTitle: string;

  @Input() loading: Boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
