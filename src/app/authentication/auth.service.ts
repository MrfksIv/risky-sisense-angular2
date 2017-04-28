import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { GlobalVars } from '../global-vars';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  private basePath: String = GlobalVars.BASE_API_URL;
  private USERID: String;
  private OPTIONS: RequestOptions;
  private ACCESS_TOKEN: String;
  private BEARER_HEADERS: Headers;


  constructor(private http: Http) { }

  authenticate(username: String, password: String) {

    let body = {username:username, password: password};
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post(`${this.basePath}/v1/authentication/login`, body, headers)
        .map((res: Response) => {
            const responseObject = res.json();

            this.ACCESS_TOKEN = responseObject.access_token;
            this.USERID = responseObject.userId;
            this.BEARER_HEADERS = new Headers({
                'Authorization': `Bearer ${this.ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            });
            this.OPTIONS = new RequestOptions({headers: this.BEARER_HEADERS});

            return responseObject;
        })
        .catch( (error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getUsername() {
      return this.http.get(`${this.basePath}/v1/users/${this.USERID}`, this.OPTIONS)
      .toPromise();
  }


}

/*
function authenticate() {
    return new Promise( (resolve, reject) => { 
        request.post({
            url: `${basepath}/v1/authentication/login`,
            form:{ "username": "stats", "password": "Master2011"}
         },function (error, response, body) {
                if(error) reject(error);
                else {
                    resolve(JSON.parse(body).access_token);
                } 
          });
    });
};

*/