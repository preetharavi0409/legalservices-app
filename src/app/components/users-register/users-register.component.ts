import { Component, NgZone, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-users-register',
  templateUrl: './users-register.component.html',
  styleUrls: ['./users-register.component.css']
})
export class UsersRegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private registerApi: ApiService
) { 

  }

  ngOnInit(): void {
    this.initiateRegisterForm();

  }


  initiateRegisterForm(){
    this.registerForm = this.fb.group({
      email: ['',[Validators.email]],
      userName: ['',[Validators.required]],
      password: ['',[Validators.required]],
      confirmPwd: ['',this.passValidator]
    });
  }

  passValidator(control: AbstractControl){
    if(control && (control.value!== null || control.value !== undefined)){
      const cnfPwdVal = control.value;
      const passControl = control.root.get('password');
      if(passControl){
        const passValue = passControl.value;
        if(passValue !== cnfPwdVal || passValue === ""){
          return{
             isError: true
          };
        }
      }
    }
    return null;
  }

  submitRegisterForm() {
    if (this.registerForm.valid) {
      this.registerApi.registerUser(this.registerForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/users-login'))
      });
    }
  }
}