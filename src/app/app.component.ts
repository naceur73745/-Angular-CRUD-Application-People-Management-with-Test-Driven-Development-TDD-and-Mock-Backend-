import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import {PersonModel} from "./api-model";
import {ApiService} from "./api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  formValue !: FormGroup;
  personModelObj: PersonModel = new PersonModel();
  person !: any;
  beingEdited: boolean  = false;

  constructor(private formbuilber: FormBuilder, private api: ApiService) {
  }

  ngOnInit(): void {
    this.formValue = this.formbuilber.group({
      id: [''],
      vorName: [''],
      nachName: [''],
      Email: ['']
    })
    this.getSubscribedperson();
  }
  onAddclick(){
    this.formValue.reset();
    this.beingEdited=false;
  }

  CreatePerson() {
    this.personModelObj.id = this.formValue.value.id;
    this.personModelObj.vorName = this.formValue.value.vorName;
    this.personModelObj.nachName = this.formValue.value.nachName;
    this.personModelObj.Email = this.formValue.value.Email;
    this.api.postPerson(this.personModelObj)
      .subscribe(res => {
          console.log(res);
          alert("jupppiiiiii new person is created!!!")
          let ref = document.getElementById('close')
          ref?.click();
          this.formValue.reset();
          this.getSubscribedperson();
        },
        error => {
          alert("woops a problem has accured !!!!");
        })
  }

  getSubscribedperson() {
    this.api.getPerson()
      .subscribe(res => {
        this.person = res;
      })

  }

  deleteSubscribedperson(row: any) {
    this.api.DeletePerson(row.id)
      .subscribe(res => {
        alert("person is deleted");
        this.getSubscribedperson();

      })

  }

  editSubscribedperson(row: any) {
    this.beingEdited = true ;
    this.personModelObj.id = row.id;
    this.formValue.controls['id'].setValue(row.id);
    this.formValue.controls['vorName'].setValue(row.vorName);
    this.formValue.controls['nachName'].setValue(row.nachName);
    this.formValue.controls['Email'].setValue(row.Email);

  }

  UpdatePersonInfo() {
    this.personModelObj.id = this.formValue.value.id;
    this.personModelObj.vorName = this.formValue.value.vorName;
    this.personModelObj.nachName = this.formValue.value.nachName;
    this.personModelObj.Email = this.formValue.value.Email;
    this.api.updatePerson(this.personModelObj, this.personModelObj.id)
      .subscribe(res => {
        alert("person info are updated ");
        let ref = document.getElementById('close')
        ref?.click();
        this.formValue.reset();
        this.beingEdited=false;
        this.getSubscribedperson();

      })


  }

}

