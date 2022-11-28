import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Users } from 'src/app/interfaces/users/users';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Roles } from 'src/app/interfaces/roles/list-roles';
import { UsersService } from 'src/app/services/api/users.service';
import { RolesService } from 'src/app/services/api/roles.service';

declare var window: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {

  constructor(private apiUsers:UsersService, private apiRoles:RolesService, private router:Router){}

  modalAsignRole: any;
  alert:any = {}
  isShowAlert:boolean = false
  users:Users[] = []
  roles:Roles[] = []

  userForm = new FormGroup({
    _id: new FormControl(''),
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  asignRoleForm = new FormGroup({
    _idUser: new FormControl(''),
    usernameUser: new FormControl(''),
    _idRole: new FormControl('', Validators.required)
  })

  ngOnInit(): void {

    if(!localStorage.getItem("token") || !localStorage.getItem("user_id")){
      this.router.navigate(['home'])
    }

    this.modalAsignRole = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );


    this.getAllusers()
    this.getAllroles()
  }

  getAllusers(){
    this.apiUsers.getAllusers().subscribe(response => {
      this.users = response
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

  getAllroles(){
    this.apiRoles.getAllroles().subscribe(response => {
      this.roles = response
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

  actionsUsers(form:any){
    if(this.isEdit){
      this.updateUser(form)
    }else{
      this.addNewUser(form)
    }
  }

  addNewUser(form:any){
    delete form._id
    if(!this.isEdit){
      this.apiUsers.addNewUser(form).subscribe(response => {
        let data:Users = response

        this.users.push(data)

        this.showAlert({'status': 'SUCCESS', 'msg': 'User added', 'class': 'success'})


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

  editUser(id:any){
    this.isEdit = true
    let i = this.users.map(obj => obj._id).indexOf(id)
    let userById = this.users[i];
    this.userForm.setValue({
      '_id': userById._id,
      'username': userById.username,
      'email': userById.email,
      'password': ''
    })
  }

  updateUser(form:any){
    if(this.isEdit){
      let i = this.users.map(obj => obj._id).indexOf(form._id)
      this.apiUsers.updateUser(form).subscribe(response => {
        let data:Users = response
        this.users[i] = data

        this.showAlert({'status': 'SUCCESS', 'msg': 'User updated', 'class': 'warning'})

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

  deleteUser(id:any){
    let i = this.users.map(obj => obj._id).indexOf(id)
    this.apiUsers.deleteUser(id).subscribe(() => {

      this.users.splice(i, 1)      
      this.cancel()
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'user deleted',
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

  
  openModalAsignRole(id:any, username:any, idRole:any = ''){
    this.modalAsignRole.show()

    this.asignRoleForm.setValue({
      '_idUser': id,
      'usernameUser': username,
      '_idRole': idRole
    })
  }

  closeModalAsignRole(){
    this.modalAsignRole.hide()
  }

  asignRoleToUser(form:any){
    delete form.usernameUser
    let i = this.users.map(obj => obj._id).indexOf(form._idUser)
    this.apiUsers.asignRoleToUser(form).subscribe(response => {
      let data:Users = response
      this.users[i] = data
      this.closeModalAsignRole()
      this.cancel()
    }, (error) => {
      this.closeModalAsignRole()
      this.cancel()
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.error.message,
        showConfirmButton:false,
      })
    })
  }

  showAlert(alert:any){
    this.alert = {}
    
    this.isShowAlert = true
    this.alert.class = alert.class
    this.alert.status = alert.status
    this.alert.msg = alert.msg
  }

  cancel(){
    this.isEdit = false
    this.userForm.reset()

    
    setTimeout(() => {
      this.isShowAlert = false
      this.alert = {}
    }, 2000);

  }
}
