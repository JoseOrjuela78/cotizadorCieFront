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

  postTables(data:string, table:string){
    const body = {
      data
    };
    return this.http.put<any>(URIS.tablas.postTools + "/" + table , body ,{observe:'response', headers: this.headers});
  }

  updateTools(body:any){
    const id = body.id_herramienta;

    return this.http.put<any>(URIS.tablas.updateTools + "/" + id , body ,{observe:'response', headers: this.headers});

  }

  getZonaProveedor(){
    return this.http.get<any>(URIS.tablas.getZonaProveedor,{observe:'response', headers: this.headers});
  }

  updateListDetail(body:any){
    const id = body.id_detalle;

    return this.http.put<any>(URIS.tablas.updateListDetatil + "/" + id , body ,{observe:'response', headers: this.headers});

  }

  updateCoin(body:any){
    const id = body.id_moneda;

    return this.http.put<any>(URIS.tablas.updateCoin + "/" + id , body ,{observe:'response', headers: this.headers});

  }

  updateParemetro(body:any){
    const id = body.id_parametro;

    return this.http.put<any>(URIS.tablas.updateParametro + "/" + id , body ,{observe:'response', headers: this.headers});

  }

  updateProveedor(body:any){
    const id = body.id_proveedor;

    return this.http.put<any>(URIS.tablas.updateProveedor + "/" + id , body ,{observe:'response', headers: this.headers});

  }

  updateRango(body:any){
    const id = body.id_rango;

    return this.http.put<any>(URIS.tablas.updateRango + "/" + id , body ,{observe:'response', headers: this.headers});

  }

  updateTarifa(body:any){
    const id = body.id_tarifa;

    return this.http.put<any>(URIS.tablas.updateTarifa + "/" + id , body ,{observe:'response', headers: this.headers});

  }

  updateTrm(body:any){
    const id = body.id_trm;

    return this.http.put<any>(URIS.tablas.updateTrm + "/" + id , body ,{observe:'response', headers: this.headers});

  }

  updateUser(body:any){
    const id = body.identificacion;

    return this.http.put<any>(URIS.usuarios.updateUser + "/" + id , body ,{observe:'response', headers: this.headers});

  }


  updateVartarifa(body:any){
    const id = body.id_vartarifa;

    return this.http.put<any>(URIS.tablas.updateVartarifas + "/" + id , body ,{observe:'response', headers: this.headers});

  }

  updateZonaMoneda(body:any){
    const id = body.id_zm;

    return this.http.put<any>(URIS.tablas.updateZonaMoneda + "/" + id , body ,{observe:'response', headers: this.headers});

  }

  updateZonaProveedor(body:any){
    const id = body.id_zp;

    return this.http.put<any>(URIS.tablas.updateZonaProveedor + "/" + id , body ,{observe:'response', headers: this.headers});

  }

  updateZonas(body:any){
    const id = body.id_zona;

    return this.http.put<any>(URIS.tablas.updateZonas + "/" + id , body ,{observe:'response', headers: this.headers});

  }







}
