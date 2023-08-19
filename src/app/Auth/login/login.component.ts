import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService }  from '../../api.service';
@Component({
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
angForm: FormGroup;
constructor(
            private fb: FormBuilder,
            private dataService: ApiService,
            private router:Router
          )
          {
              this.angForm = this.fb.group({
              email: ['', [Validators.required,Validators.minLength(1), Validators.email]],
              password: ['', Validators.required]
              });

          }

ngOnInit() {
}
postdata(angForm: { value: { email: any; password: any; }; })
{
this.dataService.userlogin(angForm.value.email,angForm.value.password)
.pipe(first())
.subscribe((data)=> {
const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/home';
 localStorage.setItem('User',JSON.stringify(data));
this.router.navigate([redirect]);
},
(err) => {
  alert(err.error.message)
  console.log(err);
});
}
get email() { return this.angForm.get('email'); }
get password() { return this.angForm.get('password'); }
}
