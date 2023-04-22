import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  idRol:string ='';

  constructor( private auth: AuthService, private router: Router ) { }

  ngOnInit(): void {
  this.idRol = this.auth.leerRol();

  }

  logout(){
    this.auth.logout();
    this.router.navigateByUrl('/login');
    return;
  }


}
