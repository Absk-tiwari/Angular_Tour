import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Users } from './Users';
import { Router } from '@angular/router';

@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})

export class AppComponent {
loginbtn:boolean;
logoutbtn:boolean;
User: Users = new Users;
userData : any[] = [];
constructor(private api: ApiService,private router:Router) {
  api.getLoggedInName.subscribe(name => this.changeName(name));

   if(this.api.isLoggedIn()){

      this.loginbtn=false;
      this.logoutbtn=true;
      var data = localStorage.getItem('User')

      if(data!=undefined){
        var dataArr  = JSON.parse(data)[0];
        this.userData.push({
          id : dataArr.id,
          profile : dataArr.profile
        });
      }

}
else{
    this.loginbtn=true;
    this.logoutbtn=false
}

}

private changeName(name: boolean): void {
    this.logoutbtn = name;
    this.loginbtn = !name;
}

logout()
{
    this.api.deleteToken();
    localStorage.clear();
    this.router.navigate(['/login'])
}
}
