import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { IndexComponent } from './pages/users/index/index.component';
import { IndexComponent as CandidatesIndexComponent } from './pages/candidates/index/index.component';
import { ProfileComponent } from './pages/users/profile/profile.component';

const routes: Routes = [
    {path: '',redirectTo: 'home', pathMatch:'full'},
    {path: 'home', component:HomeComponent},
    {path: 'login', component:LoginComponent},
    {path: 'dashboard', component:DashboardComponent},
    {path: 'users', component:IndexComponent},
    {path: 'candidates', component:CandidatesIndexComponent},
    {path: 'profile', component:ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routeRomponents = [
  HomeComponent,
  LoginComponent,
  DashboardComponent,
  IndexComponent,
  CandidatesIndexComponent,
  ProfileComponent
]