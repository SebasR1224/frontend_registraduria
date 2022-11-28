import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permissions } from 'src/app/interfaces/permissions/permissions';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  url: string = "http://127.0.0.1:7777"
  constructor(private http: HttpClient) { }

  getAllPermissions(): Observable<Permissions[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });

    let endpoint = this.url + "/permissions"

    return this.http.get<Permissions[]>(endpoint, { 'headers': headers })
  }
}
