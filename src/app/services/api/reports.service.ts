import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VotesCandidates } from 'src/app/interfaces/reports/votes-candidates';
import { VoteList } from 'src/app/interfaces/reports/vote-list';
import { TotalVotesTable } from 'src/app/interfaces/reports/total-votes-table';
import { TotalVotesPoliticalParty } from 'src/app/interfaces/reports/total-votes-political-party';
import { PercentageCongress } from 'src/app/interfaces/reports/percentage-congress';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  url: string = "http://127.0.0.1:7777"
  constructor(private http: HttpClient) { }

  getVoteList(idTable:any): Observable<VoteList[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    let endpoint
    if(idTable == null){
      endpoint = this.url + "/vote-list"
    }else{
      endpoint = this.url + "/vote-list/"+idTable
    }
    return this.http.get<VoteList[]>(endpoint, { 'headers': headers })
  }

  getVotesCandidates(idTable:any):Observable<VotesCandidates[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    let endpoint
    if(idTable == null){
      endpoint = this.url + "/get-votes-candidates"
    }else{
      endpoint = this.url + "/get-votes-candidates/"+idTable
    }
    return this.http.get<VotesCandidates[]>(endpoint, { 'headers': headers })
  }

  getTotalVotesTable(): Observable<TotalVotesTable[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });

    let endpoint = this.url + "/total-votes-table"

    return this.http.get<TotalVotesTable[]>(endpoint, { 'headers': headers })
  }

  getTotalVotesPoliticalParty(idTable:any): Observable<TotalVotesPoliticalParty[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    let endpoint
    if(idTable == null){
      endpoint = this.url + "/total-votes-political-party"
    }else{
      endpoint = this.url + "/total-votes-political-party/"+idTable
    }
    return this.http.get<TotalVotesPoliticalParty[]>(endpoint, { 'headers': headers })
  }

  getPercentageCongress():Observable<PercentageCongress[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });

    let endpoint = this.url + "/percentage-congress"

    return this.http.get<PercentageCongress[]>(endpoint, { 'headers': headers })
  }

}
