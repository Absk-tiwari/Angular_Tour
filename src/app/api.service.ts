import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from './Users';
import { FormArray, FormControl } from '@angular/forms';

@Injectable({
providedIn: 'root'
})

export class ApiService {


redirectUrl!: string;
local:string = 'http://localhost/test/save.php';
baseUrl:string = "http://localhost/ang-php-mysql/api/";

qualsUrl : string = 'http://192.168.1.33/codeIgniter_CRUD/index.php/api/qualifications/add_qualifications/create_qualifications_post';

@Output() getLoggedInName: EventEmitter<any> = new EventEmitter();



constructor(private httpClient : HttpClient) {}


public userlogin(username: any, password: any) {

  return this.httpClient.post<any>(this.baseUrl + '/login.php', { username, password })
  .pipe(map(Users => {
    console.log(Users);
    if(Users.length > 0){
      this.setToken(Users[0].email);
      this.getLoggedInName.emit(true);
    }
    return Users;
  }));

}


public SignUp(name: any,email: any,pwd: any) {
    return this.httpClient.post<any>(this.baseUrl + '/register.php', { name,email, pwd })
    .pipe(map(Users => {
        return Users;
    }));
}


setToken(token: string) {
  localStorage.setItem('token', token);
}

getToken() {
  return localStorage.getItem('token');
}

deleteToken() {
  localStorage.removeItem('token');
}

isLoggedIn() {

  const usertoken = this.getToken();
  console.log(usertoken)
  return (usertoken != null)? true : false;

}


submitQuals(students:any){

  let name = students.name
  let email = students.email
  let mobile = students.mobile
  let qualifications = students.qualifications

  return this.httpClient.post<any>(this.qualsUrl , { name, email, mobile , qualifications }).pipe(map(data => {
    return data;
  }));

}

}
