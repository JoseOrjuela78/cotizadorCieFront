import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { URIS } from '../common/uris';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  userToken: string ='';
  headers: any;
  headersN:any;

  constructor(private http:HttpClient, private authsvc: AuthService) {
    this.userToken = this.authsvc.leerToken();
    this.headers = new HttpHeaders({'token':`${this.userToken}`});
  }


  putReportStock(body:any){
    return this.http.put<any>(URIS.reports.stock, body ,{observe:'response', headers: this.headers});
  };

  putGenerateCsv(body: any) {
    return this.http.put(URIS.reports.generateCsv, body,{ observe: 'response', headers: this.headers });
  };

}
