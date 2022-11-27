import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  user:any = {}
  islogin:boolean = false

  constructor(private router:Router){}

  ngOnInit(): void {
    this.verifyLogin()

    let decode = this.getDecodedAccessToken(String(localStorage.getItem("token")))
    let userByJwt = decode.sub
    this.user.username = userByJwt.username
  }

  verifyLogin(){
    if(localStorage.getItem('token') && localStorage.getItem('user_id')){ 
      this.islogin = true
    }
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  logOut(){
    localStorage.removeItem("token")
    localStorage.removeItem("user_id")
    this.router.navigate(['home']);
  }


}
