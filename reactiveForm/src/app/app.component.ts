import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup, FormArray } from "@angular/forms";
import { forbiddenNameValidator } from './shared/user-name.validators';
import { PasswordValidator } from './shared/password.validators';
// import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})

export class AppComponent implements OnInit {
  registrationForm: FormGroup;

  get userName(){
  return this.registrationForm.get('userName')

}
  get email(){
  return this.registrationForm.get('email')
}

get alternateEmails(){
  return this.registrationForm.get('alternateEmails') as FormArray;
}

addAlternateEmails(){
  this.alternateEmails.push(this.fb.control(''));
}

  constructor(private fb: FormBuilder){}

  ngOnInit(){
    this.registrationForm=this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3),forbiddenNameValidator(/password/)]],
      email: [''],
      subscribe: [false],
      password: [''],
      confirmPassword: [''],
      address: this.fb.group({
        city:[''],
        state:[''],
        pinCode:['']
      }),
      alternateEmails: this.fb.array([])
    },{validator: PasswordValidator});

    this.registrationForm.get('subscribe').valueChanges
    .subscribe(checkedValue=>{
      const email= this.registrationForm.get('email');
      if(checkedValue){
        email.setValidators(Validators.required);
      }
      else{
        email.clearValidators();
      }
      email.updateValueAndValidity();
    })
  }


  // registrationForm = new FormGroup({
  //   userName: new FormControl(''),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //   city: new FormControl(''),
  //   state: new FormControl(''),
  //   pinCode: new FormControl('')
  //   })
  // });
}
