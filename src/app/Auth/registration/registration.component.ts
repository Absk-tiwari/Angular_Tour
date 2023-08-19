import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  formData:FormGroup;
  public constructor(private api:ApiService ,private fb:FormBuilder ,private router:Router){
    this.formData = this.fb.group({
      name: ['' ,Validators.required],
      email: ['' , Validators.required],
      password: ['', Validators.required]
  })
  }

  CreateUser(formData:  { value: { name:string, email:string; password:string; }; }){
    this.api.SignUp(formData.value.name, formData.value.email, formData.value.password).pipe(first()).subscribe(data=>{
      const redirect = this.api.redirectUrl ? this.api.redirectUrl : '/login';
      this.router.navigate([redirect]);
    },
    (err)=>{
      alert(err.error.message);
    });
  }


  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
}
