import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Roles } from 'src/app/interfaces/roles/list-roles';
import { Permissions } from 'src/app/interfaces/permissions/permissions';
import { RolesService } from 'src/app/services/api/roles.service';
import { PermissionsService } from 'src/app/services/api/permissions.service';
import { PermissionsRoles } from 'src/app/interfaces/permissions-roles/permissions-roles';
import { PermissionsRolesService } from 'src/app/services/api/permissions-roles.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  constructor(private apiRoles:RolesService, private apiPermissions:PermissionsService, private apiPermissionsRoles:PermissionsRolesService, private router:Router){}
  roles:Roles[] = []
  permissions:Permissions[] = []
  permissionsRoles:PermissionsRoles[] = []
  permissionsToRoles:PermissionsRoles[] = []
  role:any = ""
  loading:boolean = true

  ngOnInit(): void {

    if(!localStorage.getItem("token") || !localStorage.getItem("user_id")){
      this.router.navigate(['home'])
    }
    this.getAllroles()
    this.getAllPermissions()

    setTimeout(() => {
      this.loading = false
    }, 10000);
    
  }

  getAllroles(){
    this.apiRoles.getAllroles().subscribe(response => {
      this.roles = response
      this.role = this.roles[0].name 
      this.getPermissionsToRoles(this.roles[0]._id)
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

  getAllPermissions(){
    this.apiPermissions.getAllPermissions().subscribe(response => {
      this.permissions = response
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

  getAllPermissionsRoles(){
    this.apiPermissionsRoles.getAllPermissionsRoles().subscribe(response => {
      this.permissionsRoles = response
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

  getPermissionsToRoles(idRole:any){
    this.apiPermissionsRoles.getPermissionsToRoles(idRole).subscribe(response => {
      this.permissionsToRoles = response
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

  changeRole(e:any){
      let idRole = e.target.value
      let i = this.roles.map(obj => obj._id).indexOf(idRole)
      let roleById = this.roles[i]
      this.role = roleById.name
      this.getPermissionsToRoles(idRole)
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 10000);
  }
  findPermissionRole(id:any){
    let i = this.permissionsToRoles.map(obj => obj.permission._id).indexOf(id)
    if(i == -1){
      return false
    }
    return true
  }

}
