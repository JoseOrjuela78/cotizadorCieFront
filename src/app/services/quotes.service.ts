import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { URIS } from '../common/uris';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  userToken: string ='';
  headers: any;
  headersN:any;

  constructor(private http:HttpClient, private authsvc: AuthService) {
    this.userToken = this.authsvc.leerToken();
    this.headers = new HttpHeaders({'token':`${this.userToken}`});
    }

  getQuotes(idquote: number):any{
    return this.http.get<any>(URIS.quotes.getQuotes +'/'+ idquote ,{observe:'response', headers: this.headers});
  }

  getRefs(key:string):any{
    return this.http.get<any>(URIS.refs.getRefs +'/'+ key,{observe:'response', headers: this.headers});
  }

  createQuote(cliente: string):any{
    const body = {
      cliente
    };

    return this.http.post<any>(URIS.quotes.createQuote,body,{observe:'response',headers:this.headers});

  }

  createQuoteDet(body:any):any{

    const bd ={
      "altoCM": Number(body.altoCM),
      "anchoCM": Number(body.anchoCM),
      "cantidad": Number(body.cantidad),
      "id_cotizacion": Number(body.id_cotizacion),
      "id_detalle": Number(body.id_detalle),
      "largoCM": Number(body.largoCM),
      "peso_kg":Number(body.peso_kg)
      };

return this.http.post<any>(URIS.quotes.createQuoteDet,bd,{observe:'response',headers:this.headers});

  }

  updateQuoteDet(body:any):any{

    const bd = {
      "id_cotdetalle": Number(body.id_cotdetalle),
      "cantidad": Number(body.cantidad),
      "largoCM": Number(body.largoCM),
      "anchoCM":Number(body.anchoCM),
      "altoCM": Number(body.altoCM),
      "peso_kg":Number(body.peso_kg)

      }

    return this.http.put<any>(URIS.quotes.updateQuoteDet,bd,{observe:'response',headers:this.headers});

  }



  generateQuote(body:any):any{

    const bd ={
      "id_detalle": Number(body.id_detalle),
      "id_cotdetalle": Number(body.id_cotdetalle),
      };

   return this.http.put<any>(URIS.quotes.generateQuote,bd,{observe:'response',headers:this.headers});

  };


  closeQuote(id_cotizacion: number):any{
    const body = {
      id_cotizacion
    };

    return this.http.post<any>(URIS.quotes.closeQuote,body,{observe:'response',headers:this.headers});

  };


  closeQuoteRow(id_cotTotales: number, id_cotizacion: number):any{
    const body = {
      id_cotTotales,
      id_cotizacion
    };

    return this.http.put<any>(URIS.quotes.closeQuoteRow,body,{observe:'response',headers:this.headers});

  }


  cpeso(bd:any):any{

    const body = {
     cantidad: bd.cantidad,
     peso_kg: bd.peso_kg,
     largoCM: bd.largoCM,
     anchoCM: bd.anchoCM,
     altoCM: bd.altoCM
    };

    return this.http.put<any>(URIS.peso.cpeso,body,{observe:'response',headers:this.headers});


  }

  deleteIdQuoete(id:number):any{
    return this.http.delete<any>(URIS.quotes.deleteQuoteDet +'/'+ id,{observe:'response',headers: this.headers});
  }


}
