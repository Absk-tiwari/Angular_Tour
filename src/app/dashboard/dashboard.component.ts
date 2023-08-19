import { Component, OnInit } from '@angular/core';
import { Users } from '../Users';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  User: Users;
  form : FormGroup;
  public constructor(private api : ApiService,private fb: FormBuilder, private router:Router){
    var root = localStorage.getItem('User')
    if(root!=undefined)
      this.User = JSON.parse(root)[0];
    else
      this.User = new Users();

    this.form = this.fb.group({
      name : this.User.name,
      email : this.User.email,
      pwd: this.User.pwd,
      pfp : this.User.pfp
    });
  }
  ngOnInit():void {

  }


  updateProfile(updatedata:FormGroup){
      let email = updatedata.value.email;
      let name = updatedata.value.name;
      let password = updatedata.value.pwd;
      let profile = updatedata.value.pfp;

     const formdata = new FormData();
     formdata.append('file', profile )
     console.log(typeof(profile));
     console.log((updatedata.value.pfp));


     this.api.updateProfile(formdata)
          .subscribe((data)=> {
          const redirect = this.api.redirectUrl ? this.api.redirectUrl : '/home';
          localStorage.setItem('User',JSON.stringify(data));
          this.router.navigate([redirect]);
          });

  }
}
