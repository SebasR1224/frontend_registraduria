import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Roles } from 'src/app/interfaces/roles/list-roles';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  url: string = "http://127.0.0.1:7777"

  constructor(private http: HttpClient) { }

  getAllroles(): Observable<Roles[]>{

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });

    let endpoint = this.url + "/roles"

    return this.http.get<Roles[]>(endpoint, { 'headers': headers })
  }

}
