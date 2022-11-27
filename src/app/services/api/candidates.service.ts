import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidates } from 'src/app/interfaces/candidates/candidates';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  url: string = "http://127.0.0.1:7777"

  constructor(private http: HttpClient) { }

  getAllCandidates(): Observable<Candidates[]>{

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });

    let endpoint = this.url + "/candidates"

    return this.http.get<Candidates[]>(endpoint, { 'headers': headers })
  }

  addNewCandidates(form: any): Observable<Candidates>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    let endpoint = this.url + "/candidates"
    return this.http.post<Candidates>(endpoint, form, {'headers': headers})
  }

  updateCandidates(form:any): Observable<Candidates> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    let endpoint = this.url + "/candidates/"+ form._id
    return this.http.put<Candidates>(endpoint, form, {'headers': headers})
  }

  deleteCandidates(id:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });

    let endpoint = this.url + "/candidates/"+ id
    return this.http.delete(endpoint, {'headers': headers})
  }

}
