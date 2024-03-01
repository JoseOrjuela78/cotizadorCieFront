import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { QuotesService } from 'src/app/services/quotes.service';


@Component({
  selector: 'app-ver-quote',
  templateUrl: './ver-quote.component.html',
  styleUrls: ['./ver-quote.component.css']
})
export class VerQuoteComponent implements OnInit {

  quoteDetail: any[] = [];
  quoteDta: any[] = [];
  quoteTotal: any[] = [];
  quoteTotalDto: any[] = [];
  quoteTotalZona: any[] = [];
  arrTitlesData: any = {};
  arrTitlesDataDetail: any = {};
  arrTitlesTotalZona: any = {};
  idQuotes: any[] = [];
  idSelected: number = 0;
  idRol: string = '';
  idSeller: number = 0;
  idSellers: any[] = [];
  customer: string = '';
  customers: any[] = [];
  botonPdf: boolean = false;

  constructor(private quoteSvc: QuotesService, private auth: AuthService) { }

  ngOnInit(): void {
    this.idRol = this.auth.leerRol();
    this.getSellers();
  }

  verQuoteDetail(idQuote: number) {
    this.quoteSvc.getQuoteDetail(idQuote).subscribe((response: any) => {

      this.botonPdf = false;
      if (!(response.body.quoteDetail == null)) {
        this.botonPdf = true;
      };
      this.arrTitlesData = Object.keys(JSON.parse(response.body.quoteDta));
      this.quoteDta = JSON.parse("[" + response.body.quoteDta + "]");
      this.quoteDetail = JSON.parse(response.body.quoteDetail);
      this.arrTitlesDataDetail = Object.keys(JSON.parse(response.body.quoteDetail)[0]);
      //console.log(this.arrTitlesDataDetail);


      if (this.idRol == '3') {
        var indice = this.arrTitlesDataDetail.indexOf("costo_unitario"); // obtenemos el indice
        this.arrTitlesDataDetail.splice(indice, 1);
        indice = this.arrTitlesDataDetail.indexOf("costo_total");
        this.arrTitlesDataDetail.splice(indice, 1);
        indice = this.arrTitlesDataDetail.indexOf("flete");
        this.arrTitlesDataDetail.splice(indice, 1);
        indice = this.arrTitlesDataDetail.indexOf("zona");
        this.arrTitlesDataDetail.splice(indice, 1);
        indice = this.arrTitlesDataDetail.indexOf("moneda");
        this.arrTitlesDataDetail.splice(indice, 1);
        indice = this.arrTitlesDataDetail.indexOf("ajuste200USD");
        this.arrTitlesDataDetail.splice(indice, 1);
        indice = this.arrTitlesDataDetail.indexOf("costoLandedUSD");
        this.arrTitlesDataDetail.splice(indice, 1);

      };

      this.quoteTotalZona = JSON.parse(response.body.quoteTotalZona);
      this.arrTitlesTotalZona = Object.keys(JSON.parse(response.body.quoteTotalZona)[0]);
      this.quoteTotal = JSON.parse(response.body.quoteTotal);
      this.quoteTotalDto = JSON.parse(response.body.quoteTotalDto);

      return

    });
  }

  getIdQuotes() {
    this.quoteSvc.getIdQuote(this.customer, this.idSeller).subscribe((response: any) => {
      console.log(response)
      this.idQuotes = JSON.parse(response.body.data);
    })
  }

  idQuoteSelected() {

    this.verQuoteDetail(this.idSelected);
    return
  }


  getSellers() {

    this.quoteSvc.getSellers().subscribe((response: any) => {
      this.idSellers = response.body.list;
    });
  };

  getCustomers(idUsuario: number) {
    this.quoteSvc.getCustomers(idUsuario).subscribe((response: any) => {

      this.customers = response.body.list;

    });
  }


  idSellerSelected() {
    this.getCustomers(this.idSeller);
    return
  }

  customerSelected() {

    this.getIdQuotes();
    return
  }

  redirectToExternalUrl(status: number): void {

    this.quoteSvc.getRescue(status).subscribe((response: any) => {

    const externalUrl: string = 'http://192.168.100.100:3005/api/quotes/pdf';//'http://localhost:3005/api/quotes/pdf';
    window.open(externalUrl, '_blank');

    });
  }

}
