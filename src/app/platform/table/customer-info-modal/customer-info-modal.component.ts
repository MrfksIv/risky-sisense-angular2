import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'rz-customer-info-modal',
  templateUrl: './customer-info-modal.component.html',
  styleUrls: ['./customer-info-modal.component.css']
})
export class CustomerInfoModalComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<CustomerInfoModalComponent>) { }

  customer: String;
  ngOnInit() {
  }

}
