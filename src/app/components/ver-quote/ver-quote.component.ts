import { Component, OnInit } from '@angular/core';
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

  constructor(private quoteSvc: QuotesService) { }

  ngOnInit(): void {

this.getIdQuotes();
  }

  verQuoteDetail(idQuote:number){
    this.quoteSvc.getQuoteDetail(idQuote).subscribe( (response:any)=>{

      console.log(response.body.message);
      this.arrTitlesData = Object.keys(JSON.parse(response.body.quoteDta));
      this.quoteDta = JSON.parse("["+response.body.quoteDta+"]");
      this.quoteDetail = JSON.parse(response.body.quoteDetail);
      this.arrTitlesDataDetail = Object.keys(JSON.parse(response.body.quoteDetail)[0]);
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
