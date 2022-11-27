import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PoliticalParties } from 'src/app/interfaces/political-parties/political-parties';

@Injectable({
  providedIn: 'root'
})
export class PoliticalPartiesService {

  url: string = "http://127.0.0.1:7777"

  constructor(private http: HttpClient) { }

  getAllPoliticalParties(): Observable<PoliticalParties[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });

    let endpoint = this.url + "/political-parties"

    return this.http.get<PoliticalParties[]>(endpoint, { 'headers': headers })
  }

}
