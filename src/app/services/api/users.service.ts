import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from 'src/app/interfaces/users/users';
import { UsersAsignRoles } from 'src/app/interfaces/users/users-asign-roles';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url: string = "http://127.0.0.1:7777"

  constructor(private http: HttpClient) { }

  getAllusers(): Observable<Users[]>{

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });

    let endpoint = this.url + "/users"

    return this.http.get<Users[]>(endpoint, { 'headers': headers })
  }

  addNewUser(form: Users): Observable<Users> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    let endpoint = this.url + "/users"

    return this.http.post<Users>(endpoint, form, {'headers': headers})
  }

  updateUser(form: Users): Observable<Users> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    let endpoint = this.url + "/users/"+ form._id
    return this.http.put<Users>(endpoint, form, {'headers': headers})
  }

  deleteUser(id:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });

    let endpoint = this.url + "/users/"+ id
    return this.http.delete(endpoint, {'headers': headers})
  }

  asignRoleToUser(form: UsersAsignRoles): Observable<Users> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    let endpoint = this.url + "/users/assign-role/"+form._idUser+ "/role/"+form._idRole
    return this.http.put<Users>(endpoint, form, {'headers': headers})
  }

}
