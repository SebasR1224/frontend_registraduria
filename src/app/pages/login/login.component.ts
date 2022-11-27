import { Component } from '@angular/core';

import {FormGroup, FormControl, Validators} from '@angular/forms'
import { ApiService } from 'src/app/services/api/api.service';

import { Router } from '@angular/router';
import { Response } from 'src/app/interfaces/security/response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
    email : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  })

  constructor(private api:ApiService, private router:Router){}

  errorStatus:boolean = false
  errorMsg:any = ""

  ngOnInit(): void {
    this.verifyLogin()
  }

  verifyLogin(){
    if(localStorage.getItem('token') && localStorage.getItem('user_id')){
      this.router.navigate(['dashboard'])
    }
  }


  login(form:any){
    this.api.loginByEmail(form).subscribe(response =>{
      let data:Response = response;
      if(data.token){
        localStorage.setItem("token", data.token)
        localStorage.setItem("user_id", data.user_id)
        this.router.navigate(['dashboard'])
      }
    }, (error) => {
      this.errorStatus = true
      this.errorMsg = error.error.msg
    })
  }

}
