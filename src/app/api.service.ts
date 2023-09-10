import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from './Users';
import { FormArray, FormControl } from '@angular/forms';
const HttpUploadOptions = {
  headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
}
@Injectable({
providedIn: 'root'
})

export class ApiService {

  common = 'http://localhost/Angular-Tour-PHP/api/';

  redirectUrl!: string;
  local:string = this.common + 'Home/save.php';
  baseUrl:string = this.common + "Auth";

  qualsUrl : string = 'http://192.168.1.33/codeIgniter_CRUD/index.php/api/qualifications/add_qualifications/create_qualifications_post';

  profileUpdate:string = this.common + 'Home/Profile/update_profile.php';

  records = this.common + 'Home/Records/records.php';

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();



  constructor(private httpClient : HttpClient) {

  }


public userlogin(username: any, password: any) {

    return this.httpClient.post<any>(this.baseUrl + '/login.php', { username, password }, {headers: new HttpHeaders().set('Access-Control-Allow-Origin','*')})
  .pipe(map(Users => {
    alert('Logged in successfully!');
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
       alert('Successfully Registered !');
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
  return (usertoken != null)? true : false;

}


submitQuals(students:any){

  let name = students.name
  let email = students.email
  let mobile = students.mobile
  let qualifications = students.qualifications

  return this.httpClient.post<any>(this.local , { name, email, mobile , qualifications }).pipe(map(data => {
    return data;
  }));

}

updateProfile(formdata: any){
  return this.httpClient.post<any>(this.profileUpdate, formdata).pipe(map(data => {
    alert('Profile Updated Successfully !');
    return data;
  }))
}

getRecords() {
  return this.httpClient.get(this.records,{responseType:"text"}).pipe(map(data => {
     return data.slice(0,-1);
  }))
}

}
