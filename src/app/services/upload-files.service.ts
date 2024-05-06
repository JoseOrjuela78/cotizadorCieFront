import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { URIS } from '../common/uris';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {
  userToken: string ='';
  headers: any;
  headersN:any;

  constructor(private http:HttpClient, private authsvc: AuthService) {
    this.userToken = this.authsvc.leerToken();
    this.headers = new HttpHeaders({'token':`${this.userToken}`});
  }


  getTable(table:string){
    return this.http.get<any>(URIS.tablas.getTabla +'/'+ table ,{observe:'response', headers: this.headers});
  }

  putTables(table:any){
    const body = {};
    return this.http.put<any>(URIS.tablas.putTables + "/" + table , body ,{observe:'response', headers: this.headers});
  }

   createUser(body:any){

    return this.http.post<any>(URIS.usuarios.createUser, body ,{observe:'response', headers: this.headers});

  }

  updateUser(body:any){
    const id = body.identificacion;

    return this.http.put<any>(URIS.usuarios.updateUser + "/" + id , body ,{observe:'response', headers: this.headers});

  }

}
