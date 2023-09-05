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
  form : FormGroup; userData : any[] = [];
  file : File | null = null ;
  public constructor(private api : ApiService,private fb: FormBuilder, private router:Router){
    var root = localStorage.getItem('User')
    if(root!=undefined){
      this.User = JSON.parse(root) ;
      var take = JSON.parse(root);
      this.userData.push({
        id : take.id,
        profile : take.profile
      })
    }
    else
      this.User = new Users();

    this.form = this.fb.group({
      id : this.User.id,
      name : this.User.name,
      email : this.User.email,
      pwd: this.User.pwd,
      pfp : this.User.pfp
    });
  }
  ngOnInit():void {

  }

  capture(event:any){
    const file : File = event.target.files[0];
    if(file){
      this.file = file;
    }
  }

  updateProfile(updatedata:FormGroup){
      let email = updatedata.value.email;
      let user_id = updatedata.value.id;
      let name = updatedata.value.name;
      let password = updatedata.value.pwd;

     const formdata = new FormData();
     formdata.append('user_id', user_id )
     formdata.append('name', name )
     formdata.append('email', email )
     formdata.append('password', password )
     if(this.file != null){
       formdata.append('profile',  this.file )
     }


     this.api.updateProfile(formdata)
          .subscribe((data)=> {
          const redirect = this.api.redirectUrl ? this.api.redirectUrl : '/home';
          var get =  localStorage.getItem('User');
          if(get?.length){
              const user =  JSON.parse(get) ;
              user.profile = data.profile
              localStorage.setItem('User', JSON.stringify(user));
            }
            this.router.navigate([redirect]);
          });

  }
}
