import { Injectable } from '@angular/core';
import { Login } from 'src/app/interfaces/security/login';
import { Response } from 'src/app/interfaces/security/response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = "http://127.0.0.1:7777"

  constructor(private http: HttpClient) { }

  loginByEmail(form: Login): Observable<Response> {
    let endpoint = this.url + "/login";
    return this.http.post<Response>(endpoint, form)
  }

}
