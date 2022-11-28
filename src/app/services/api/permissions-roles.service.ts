import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PermissionsRoles } from 'src/app/interfaces/permissions-roles/permissions-roles';

@Injectable({
  providedIn: 'root'
})
export class PermissionsRolesService {

  url: string = "http://127.0.0.1:7777"

  constructor(private http: HttpClient) { }

  getAllPermissionsRoles(): Observable<PermissionsRoles[]>{

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });

    let endpoint = this.url + "/permissions-roles"

    return this.http.get<PermissionsRoles[]>(endpoint, { 'headers': headers })
  }

  getPermissionsToRoles(idRole:any): Observable<PermissionsRoles[]>{

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });

    let endpoint = this.url + "/permissions-roles/permissions/role/"+idRole

    return this.http.get<PermissionsRoles[]>(endpoint, { 'headers': headers })
  }
}
