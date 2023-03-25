import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../../common/models/usuario';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  profileForm: FormGroup;
  usuario: any = new UsuarioModel();
  userToken: string = '';
  today:Date = new Date()


  constructor(private auth: AuthService, private router :Router) {
    this.profileForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      pass: new FormControl('',Validators.required)
    });

  }


  ngOnInit(): void {

  }

  submit(){

    if(this.profileForm.status == 'INVALID'){
      return;
    };


    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Espere por favor...'

    });
    Swal.showLoading()

    this.usuario.username = this.profileForm.get('userName')?.value;
    this.usuario.pass = this.profileForm.get('pass')?.value;

    this.auth.login(this.usuario).subscribe((response:any)=>{


     if(!response.body.ok){
      Swal.fire({
        allowOutsideClick: true,
        icon: 'error',
        title: 'Error De Autenticación',
        text: response.body.msg
         });
         return

     }

     Swal.close();
     this.guardarToken(response.body.token);
     this.auth.leerToken();
     this.router.navigate(['/home']);

    })



  }


  private guardarToken(idToken:string){

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date()
    hoy.setSeconds(28800);
    localStorage.setItem('expiraToken', hoy.getTime().toString());

    }

}
