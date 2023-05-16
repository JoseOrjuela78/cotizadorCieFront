import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { QuotesService } from 'src/app/services/quotes.service';

@Component({
  selector: 'app-ver-quote',
  templateUrl: './ver-quote.component.html',
  styleUrls: ['./ver-quote.component.css']
})
export class VerQuoteComponent implements OnInit {

  quoteDetail:any[] = [];
  quoteDta:any[] = [];
  quoteTotal:any[] = [];
  quoteTotalDto:any[] = [];
  quoteTotalZona:any[] = [];
  arrTitlesData:any = {};
  arrTitlesDataDetail:any= {};
  arrTitlesTotalZona:any= {};
  idQuotes:any[] = [];
  idSelected:number = 0;
  idRol:string ='';

  constructor(private quoteSvc: QuotesService, private auth: AuthService) { }

  ngOnInit(): void {
this.idRol = this.auth.leerRol();
this.getIdQuotes();
  }

  verQuoteDetail(idQuote:number){
    this.quoteSvc.getQuoteDetail(idQuote).subscribe( (response:any)=>{

      console.log(response.body.message);
      this.arrTitlesData = Object.keys(JSON.parse(response.body.quoteDta));
      this.quoteDta = JSON.parse("["+response.body.quoteDta+"]");
      this.quoteDetail = JSON.parse(response.body.quoteDetail);
      this.arrTitlesDataDetail = Object.keys(JSON.parse(response.body.quoteDetail)[0]);


      if(this.idRol == '3'){
        var indice = this.arrTitlesDataDetail.indexOf("costo_unitario"); // obtenemos el indice
        this.arrTitlesDataDetail.splice(indice, 1);
        indice = this.arrTitlesDataDetail.indexOf("costo_total");
        this.arrTitlesDataDetail.splice(indice, 1);
        indice = this.arrTitlesDataDetail.indexOf("flete");
        this.arrTitlesDataDetail.splice(indice, 1);

      };



      this.quoteTotalZona = JSON.parse(response.body.quoteTotalZona);
      this.arrTitlesTotalZona = Object.keys(JSON.parse(response.body.quoteTotalZona)[0]);
      this.quoteTotal = JSON.parse(response.body.quoteTotal);
      this.quoteTotalDto =JSON.parse(response.body.quoteTotalDto);

      return

    });
  }

  getIdQuotes(){
    this.quoteSvc.getIdQuote().subscribe( (response:any)=>{
      this.idQuotes = JSON.parse(response.body.data);


    })
  }


  idQuoteSelected(){
      this.verQuoteDetail(this.idSelected);
      return
  }

}
