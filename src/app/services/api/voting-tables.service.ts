import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VotingTables } from 'src/app/interfaces/voting-tables/voting-tables';

@Injectable({
  providedIn: 'root'
})
export class VotingTablesService {
  url: string = "http://127.0.0.1:7777"
  constructor(private http: HttpClient) { }

  getAllVotingTables(): Observable<VotingTables[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });

    let endpoint = this.url + "/voting-tables"

    return this.http.get<VotingTables[]>(endpoint, { 'headers': headers })
  }
}
