import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { UsuarioModel } from '../common/models/usuario';
import { URIS } from '../common/uris';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userToken: string = '';
  idRol:string = '';

  constructor(private http:HttpClient) {
    this.leerToken();
  }

  login(usuario: UsuarioModel):any{

    return this.http.post<any>(URIS.usuarios.login,usuario,{observe:'response'});


  }

  leerToken(){

    if(localStorage.getItem('token')){
      this.userToken = String(localStorage.getItem('token'));
    } else {
      this.userToken = '';
    }

     return this.userToken;

    }

  estaAutenticado(): boolean{


        if(this.userToken.length < 2){
      return false;
    }

    const expira = Number(localStorage.getItem('expiraToken'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date()){
      return true;
    }else {
      return false;
    }

    };

    logout(){
      localStorage.removeItem('token');
      this.userToken ='';
      return false;

    }

    leerRol(){

      if(localStorage.getItem('idrol')){
        this.idRol = String(localStorage.getItem('idrol'));
      } else {
        this.idRol = '';
      }

       return this.idRol;

      }



}

