import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { ArrayType } from '@angular/compiler';
import { first } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  studentform: FormGroup;
  ready : number = 0;
  public constructor( private fb:FormBuilder, private api:ApiService){
    this.studentform = this.fb.group({
        name : '',
        email : '',
        mobile : '',
        qualifications : this.fb.array([])
    })

  }

  students(): FormArray{
    return this.students() as FormArray
  }




  removeStudent(stuIndex:number){
    this.students().removeAt(stuIndex);
    if(this.students().length == 0){
      // alert('ready ko kam karna chahiye')
      this.ready = 0;
    }
  }

  removeStudentQual( qualIndex:number){
    this.studentQuals().removeAt(qualIndex)
  }

  studentQuals():FormArray{
    return this.studentform.get('qualifications') as FormArray
  }

  qualSet():FormGroup{
    return this.fb.group({
      year : '',
      course : '',
      university : ''
    })
  }

  addStudentQual() {
    this.studentQuals().push(this.qualSet());
  }
  // addQual():FormArray{
    // return this.students().at(index).get('qualifications').at
  // }

  SubmitData(form:{ value : { firstname :string ; lastname : string ; qualifications: ArrayType }; }){
    console.log('data triggered');

    this.api.submitQuals(form.value).pipe(first()).subscribe(data=>{
    },
    (err)=> {
      alert(err.error.text);
      console.log(err.error);
    })
  }


  append() {

    alert('Going to append don\'t know how to apply the jquery here!')

    var add ='\ <div classs="row" style="display: flex;"><div class="form-group aa">\
                 <label for="exampleInputEmail1">Qualifications : University</label><input type="text" name="qualifications[\'university\'][]"  id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter University"></div><div class="form-group aa"><label for="exampleInputEmail1">Qualifications : Courses</label>\
                 <input type="text" name="qualifications[\'courses\'][]"  id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter course name">\
               </div><div class="form-group aa">\
                 <label for="exampleInputPassword1">Qualifications : Year</label>\
                 <input type="text" name="qualifications[\'year\'][]"  id="exampleInputPassword1" placeholder="Enter Passing Year"></div></div></div>';


    // angular.element(el).append($compile(html)($scope))

  }


  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    // this.studentform = this.fb.group({
    //   students: this.fb.array([])
    // });
  }
}
function jQuery(arg0: string) {
  throw new Error('Function not implemented.');
}

