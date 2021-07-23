import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router , ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-users-login',
  templateUrl: './users-login.component.html',
  styleUrls: ['./users-login.component.css']
})
export class UsersLoginComponent implements OnInit {

  errMsg: any;
  loginForm!: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ngZone: NgZone,
    private loginApi: ApiService
) { 

  }

  ngOnInit(): void {
    this.initiateLoginForm();

  }


  initiateLoginForm(){
    this.loginForm = this.fb.group({
      email: ['',[Validators.email]],
      password: ['',[Validators.required]]
    });
  }

  submitLoginForm() {
    if (this.loginForm.valid) {
      this.loginApi.loginUser(this.loginForm.value).subscribe(res => {
       // User= JSON.parse(res);
        localStorage.setItem('token',res.toString());
        this.ngZone.run(() => this.router.navigateByUrl('/case/cases-list'))
      },
      err=>{
        console.error('error caught in component',err);
        if(err.indexOf('501') >0){
           this.errMsg = "Wrong Password ! Please try again!!";
        }
        else {
          this.errMsg = "User Not registered!!";

        }
        throw err;
      });
    }
  }

  movetoregister(){
    this.router.navigate(['/users-register'],{relativeTo:this.activatedRoute});
  }
  }

