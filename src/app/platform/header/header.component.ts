import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'rz-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private username: String;
  constructor(private router: Router) { }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  ngOnInit() {
    this.username = localStorage.getItem('username');

  }

}
