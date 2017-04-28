import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'rz-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth : AuthService, private router: Router) { }

  ngOnInit() {
  }

  test() {
    console.log('Clicked!');
  }

  authenticate(credentialsObject) {
    this.auth.authenticate(credentialsObject.username, credentialsObject.password).subscribe(
      res => {
        localStorage.setItem('sisenseToken', res.access_token);
        console.log('Sucess: ',  res);
        this.getUsername();
      },
      err => console.log('Error:', err)
    );
  }

  logForm(form) {
    console.log(form);
  }

  getUsername() {
    this.auth.getUsername().then(res => {
     const responseObject = res.json();
     localStorage.setItem('username', responseObject.userName);
     this.navigateToPlatform();
    })
    .catch(this.handleError);
  }


  private handleError(error:any): Promise<any> {
    console.log('An error occurred ', error);
    return Promise.reject(error.message || error);
  }

  private navigateToPlatform() {
    this.router.navigate(['platform']);
  }
}
