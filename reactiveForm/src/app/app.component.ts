import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { forbiddenNameValidator } from './shared/user-name.validators';
import { PasswordValidator } from './shared/password.validators';
// import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})

export class AppComponent {
  get userName(){
  return this.registrationForm.get('userName')
}

  constructor(private fb: FormBuilder){}

  ngOnInit(){
    // this.registrationForm.setValue({
    //   patchValue for few formcontrol field
    //   userName: 'Sachin',
    //   password:  'test',
    //   confirmPassword: 'test',
    //   address: {
    //     city: 'City',
    //     state: 'State',
    //     pinCode: '250002'
    //   }
    // })
  }


  registrationForm=this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(3),forbiddenNameValidator(/password/)]],
    password: [''],
    confirmPassword: [''],
    address: this.fb.group({
      city:[''],
      state:[''],
      pinCode:['']
    })
  },{validator: PasswordValidator});
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
