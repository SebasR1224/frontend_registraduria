import { Component } from '@angular/core';
import jwt_decode from 'jwt-decode'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user:any = {}

  ngOnInit(): void {

    let decode = this.getDecodedAccessToken(String(localStorage.getItem("token")))
    let userByJwt = decode.sub
    this.user._id = userByJwt._id
    this.user.username = userByJwt.username
    this.user.email = userByJwt.email
    this.user.role = userByJwt.role
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

}
