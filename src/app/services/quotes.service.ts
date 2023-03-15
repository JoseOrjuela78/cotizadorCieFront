import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { URIS } from '../common/uris';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  constructor(private http:HttpClient) { }

  getQuotes(idquote: number):any{
    return this.http.get<any>(URIS.quotes.getQuotes +'/'+ idquote ,{observe:'response'});
  }

  getBrands():any{
    return this.http.get<any>(URIS.brands.getBrands,{observe:'response'});
  }

  getRefs(brand:string):any{
    return this.http.get<any>(URIS.refs.getRefs +'/'+ brand,{observe:'response'});
  }

  createQuote(cliente: string):any{
    const body = {
      cliente
    };

    return this.http.post<any>(URIS.quotes.createQuote,body,{observe:'response'});

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

return this.http.post<any>(URIS.quotes.createQuoteDet,bd,{observe:'response'});

  }



  generateQuote(body:any):any{

    const bd ={
      "id_detalle": Number(body.id_detalle),
      "id_cotdetalle": Number(body.id_cotdetalle),
      };

   return this.http.put<any>(URIS.quotes.generateQuote,bd,{observe:'response'});

  }
}
