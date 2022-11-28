import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { VoteList } from 'src/app/interfaces/reports/vote-list';
import { ReportsService } from 'src/app/services/api/reports.service';
import { VotingTables } from 'src/app/interfaces/voting-tables/voting-tables';
import { VotingTablesService } from 'src/app/services/api/voting-tables.service';
import { VotesCandidates } from 'src/app/interfaces/reports/votes-candidates';
import { TotalVotesTable } from 'src/app/interfaces/reports/total-votes-table';
import { TotalVotesPoliticalParty } from 'src/app/interfaces/reports/total-votes-political-party';
import { PercentageCongress } from 'src/app/interfaces/reports/percentage-congress';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private apiReports:ReportsService, private apiVotingTables:VotingTablesService, private router:Router){}

  voteList:VoteList[] = []
  votingTables:VotingTables[] = []
  votesCandidates:VotesCandidates[] = []
  totalVotesTable: TotalVotesTable[] = []
  totalVotesPoliticalParty: TotalVotesPoliticalParty[] = []
  percentageCongress: PercentageCongress[] = []

  sumAllVotes:any = 0
  registeredDocuments:any = 0

  

  ngOnInit():void {
    if(!localStorage.getItem("token") || !localStorage.getItem("user_id")){
        this.router.navigate(['home'])
    }

    this.getVoteList()
    this.getAllVotingTables()
    this.getVotesCandidates()
    this.getTotalVotesTable()
    this.getTotalVotesPoliticalParty()
    this.getPercentageCongress()
  }

  getAllVotingTables(){
    this.apiVotingTables.getAllVotingTables().subscribe(response => {
      this.votingTables = response
    }, (error) => {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.error.message,
        showConfirmButton:false,
      })
    })
  }

  getVoteList(idTable:any = null){
      this.apiReports.getVoteList(idTable).subscribe(response => {
        this.voteList = response

        this.voteList.forEach(item => {
          this.sumAllVotes = this.sumAllVotes + item.total_votes
        })

      }, (error) => {

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message,
          showConfirmButton:false,
        })
      })
  }

  getVotesCandidates(idTable:any = null){
    this.apiReports.getVotesCandidates(idTable).subscribe(response => {
      this.votesCandidates = response
    }, (error) => {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.error.message,
        showConfirmButton:false,
      })
    })
  }

  getTotalVotesTable(){
    this.apiReports.getTotalVotesTable().subscribe(response => {
      this.totalVotesTable = response


      this.totalVotesTable.forEach(item => {
        this.registeredDocuments = this.registeredDocuments + item.registered_documents
      })

    }, (error) => {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.error.message,
        showConfirmButton:false,
      })
    })
  }

  getTotalVotesPoliticalParty(idTable:any = null){
    this.apiReports.getTotalVotesPoliticalParty(idTable).subscribe(response => {
      this.totalVotesPoliticalParty = response
    }, (error) => {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.error.message,
        showConfirmButton:false,
      })
    })
  }

  getPercentageCongress(){
    this.apiReports.getPercentageCongress().subscribe(response => {
      this.percentageCongress = response
    }, (error) => {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.error.message,
        showConfirmButton:false,
      })
    })
  }

  filterBytable(e:any){
    this.sumAllVotes = 0
    let idTable = e.target.value
    if(idTable){
      this.getVoteList(idTable)
      this.getVotesCandidates(idTable)
      this.getTotalVotesPoliticalParty(idTable)
    }else{
      this.getVoteList()
      this.getVotesCandidates()
      this.getTotalVotesPoliticalParty()
    }
  }
  

}
