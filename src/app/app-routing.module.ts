import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CanActivateGuard } from './common/guard/can-activate.guard';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { VerQuoteComponent } from './components/ver-quote/ver-quote.component';
const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path:'',component:NavbarComponent,canActivate:[CanActivateGuard],
children:[
  {path:'home', component: HomeComponent},
  {path:'upload', component: UploadFilesComponent},
  {path:'verQuote', component: VerQuoteComponent}
]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
