import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
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
  previewUrl : string | ArrayBuffer | null | undefined
  @ViewChildren("input") inputs: QueryList<ElementRef> | undefined;

  triggerEvent = (el: HTMLElement, eventType: string ) =>
   el.dispatchEvent(new window.Event(eventType, { bubbles: true }));

  public constructor(private api : ApiService,private fb: FormBuilder, private router:Router,private cdRef: ChangeDetectorRef){
    var root = localStorage.getItem('User')

    if(root!=undefined){
      this.User = JSON.parse(root)[0] ;
      var take = JSON.parse(root);
      console.log(take);

      this.userData.push({
        id : take[0].id,
        profile : take[0].profile
      });
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


  capture(event:any){
    const file : File = event.target.files[0];
    if(file){
      this.file = file;
      var reader = new FileReader ();
      reader.readAsDataURL(file);
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.previewUrl = event.target?.result;
      }
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
          const redirect = '/home';
          var get =  localStorage.getItem('User');
          if(get != undefined){
            const user =  JSON.parse(get);
            console.log(user)
              user[0].profile = data.profile
              localStorage.setItem('User', JSON.stringify(user));
            }
            this.router.navigate([redirect]);
          });

  }


  uploadImage(event:any){
    // console.log(event.target.id, document.getElementById('pfp'));
    const elem = document.getElementById('files');
    console.log(elem)
    if(elem != null){
      this.triggerEvent(elem , 'change');
    }
  }

  ngOnInit():void {
    console.log(this.userData)
  }

  // ngAfterViewInit() {
  //   if(this.inputs != undefined){
  //     const inputToTrigger = this.inputs.toArray()[2];
  //     (inputToTrigger.nativeElement as HTMLInputElement).dispatchEvent(
  //       new Event("change")
  //     );
  //   }
  //   this.cdRef.detectChanges();
  // }

}
