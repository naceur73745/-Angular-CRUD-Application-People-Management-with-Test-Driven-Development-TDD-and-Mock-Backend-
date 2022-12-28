import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from'@angular/forms'
import {PersonModel} from "./api-model.ts.service";
import {ApiService} from "./api-service.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  formValue !: FormGroup;
  personModelObj  : PersonModel = new PersonModel() ;
  person !: any ;

  constructor(private formbuilber:FormBuilder , private api:ApiService) {}
  ngOnInit():void {
    this.formValue=this.formbuilber.group({
      id:[''],
      FirstName:[''],
      LastName:[''],
      age:['']
    })
    this.getSubscribedperson();
  }

  CreatePerson(){
    this.personModelObj.id = this.formValue.value.id ;
    this.personModelObj.FirstName = this.formValue.value.FirstName ;
    this.personModelObj.LastName = this.formValue.value.LastName ;
    this.personModelObj.age = this.formValue.value.age ;
    this.api.postPerson(this.personModelObj)
      .subscribe(res=>{
      console.log(res);
      alert("jupppiiiiii new person is created!!!")
        let ref  = document.getElementById('close')
        ref?.click();
        this.formValue.reset();
        this.getSubscribedperson();
    },
    error => {
      alert("woops a problem has accured !!!!");
    })
  }
  getSubscribedperson(){
    this.api.getPerson()
      .subscribe(res=>{
        this.person = res ;
      })

  }

  deleteSubscribedperson(row: any ){
    this.api.DeletePerson(row.id)
      .subscribe(res=>{
        alert("person is deleted" ) ;
        this.getSubscribedperson();

      })

  }
  editSubscribedperson(row: any ){

    this.personModelObj.id=row.id ;
    this.formValue.controls['id'].setValue(row.id);
    this.formValue.controls['FirstName'].setValue(row.FirstName);
    this.formValue.controls['LastName'].setValue(row.LastName);
    this.formValue.controls['age'].setValue(row.age);
    this.formValue.controls['age'].setValue(row.age);
  }
  UpdatePersonInfo(){
    this.personModelObj.id = this.formValue.value.id ;
    this.personModelObj.FirstName = this.formValue.value.FirstName ;
    this.personModelObj.LastName = this.formValue.value.LastName ;
    this.personModelObj.age = this.formValue.value.age ;
    this.api.updatePerson(this.personModelObj , this.personModelObj.id)
      .subscribe(res=>{
        alert("person info are updated " ) ;
        let ref  = document.getElementById('close')
        ref?.click();
        this.formValue.reset();
        this.getSubscribedperson();

      })



  }

}

