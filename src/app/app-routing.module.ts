import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CanActivateGuard } from './common/guard/can-activate.guard';
const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path:'',component:NavbarComponent,canActivate:[CanActivateGuard],
children:[
  {path:'home', component: HomeComponent}
]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
