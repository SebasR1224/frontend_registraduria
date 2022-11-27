import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Candidates } from 'src/app/interfaces/candidates/candidates';
import { PoliticalParties } from 'src/app/interfaces/political-parties/political-parties';
import { CandidatesService } from 'src/app/services/api/candidates.service';
import { PoliticalPartiesService } from 'src/app/services/api/political-parties.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {

  constructor(private apiCandidates:CandidatesService, private apiPoliticalParties:PoliticalPartiesService , private router:Router){}

  candidates:Candidates[] = []
  politicalParties:PoliticalParties[] = []

  candidatesForm = new FormGroup({
    _id: new FormControl('', Validators.required),
    dni: new FormControl('', Validators.required),
    resolution_number: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    id_politicalParty: new FormControl('', Validators.required)
  })

  ngOnInit():void {

    if(!localStorage.getItem("token") || !localStorage.getItem("user_id")){
        this.router.navigate(['home'])
    }

    this.getAllCandidates()
    this.getAllPoliticalParties()
  }

  getAllCandidates(){

    this.apiCandidates.getAllCandidates().subscribe(response => {
      this.candidates = response
    }, (error) =>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.error.message,
        showConfirmButton:false,
      })
      this.router.navigate(['dashboard']);
    })

  }

  getAllPoliticalParties(){
    this.apiPoliticalParties.getAllPoliticalParties().subscribe(response => {
      this.politicalParties = response
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.error.message,
        showConfirmButton:false,
      })
      this.router.navigate(['dashboard']);
    })
  }

  isEdit:boolean = false

  actionsCandidates(form:any){
    if(this.isEdit){
      this.updateCandidates(form)
    }else{
      this.addNewCandidates(form)
    }
  }

  addNewCandidates(form:any){
    delete form._id
    if(!this.isEdit){
      this.apiCandidates.addNewCandidates(form).subscribe(response => {
        let data:Candidates = response
        this.candidates.push(data)
        this.cancel()
      }, (error) => {
        this.cancel()
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message,
          showConfirmButton:false,
        })
      })
    }
  }

  editCandidates(id:any){
    this.isEdit = true
    let i = this.candidates.map(obj => obj._id).indexOf(id)

    let candidateById = this.candidates[i]

    this.candidatesForm.setValue({
    '_id': candidateById._id,
    'dni': candidateById.dni,
    'resolution_number': candidateById.resolution_number,
    'name': candidateById.name,
    'last_name': candidateById.last_name,
    'id_politicalParty':candidateById.politicalParty._id
    })

  }

  updateCandidates(form:any){
    if(this.isEdit){
      let i = this.candidates.map(obj => obj._id).indexOf(form._id)
      this.apiCandidates.updateCandidates(form).subscribe(response => {
        let data:Candidates = response
        this.candidates[i] = data
        this.cancel()
      }, (error) => {

        this.cancel()
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message,
          showConfirmButton:false,
        })

      })

    }
  }

  deleteCandidates(id:any){
    let i = this.candidates.map(obj => obj._id).indexOf(id)
    this.apiCandidates.deleteCandidates(id).subscribe(() => {

      this.candidates.splice(i, 1)      
      this.cancel()
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Candidate deleted',
        showConfirmButton: false,
        timer: 1500
      })

    }, (error) => {
      this.cancel()
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.error.message,
        showConfirmButton:false,
      })
    })
  }

  cancel(){
    this.isEdit = false
    this.candidatesForm.reset()
  }

}
