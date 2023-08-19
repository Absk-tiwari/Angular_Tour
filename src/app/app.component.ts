import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Users } from './Users';

@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})

export class AppComponent {
loginbtn:boolean;
logoutbtn:boolean;
User: Users = new Users;
constructor(private dataService: ApiService) {
dataService.getLoggedInName.subscribe(name => this.changeName(name));
 if(this.dataService.isLoggedIn())
{
console.log("loggedin");
this.loginbtn=false;
this.logoutbtn=true;
    var data = localStorage.getItem('User')
    if(data!=undefined){
      this.User  = JSON.parse(data)[0];
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
this.dataService.deleteToken();
localStorage.clear();
window.location.href = window.location.href;
}
}
