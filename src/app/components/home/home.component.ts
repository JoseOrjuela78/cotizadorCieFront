import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IQuote } from 'src/app/common/models/cotizacion';
import { QuotesService } from '../../services/quotes.service';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['Index','Part_number','Brand','Description','Cantidad','Peso_total','Preciolistacop','Preciototal','Actions'];
  dataSource = new MatTableDataSource<IQuote>([]);
  clickedRows = new Set<IQuote>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  brandsList:any[] = [];
  refsList:any[] = [];
  statusForms: Boolean = false;
  id_quote: number = 0;

  public formBrands: any;
  public formQuoteDet: any;



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  constructor(private quoteSvc: QuotesService) {
  this.formBrands = new FormGroup({
    'selectedBrand' : new FormControl('',[Validators.required]),
    'cliente' : new FormControl('',[Validators.required]),
    'part-number' : new FormControl('',[Validators.required])
  });
  this.formQuoteDet = new FormGroup({
    "id_cotizacion" : new FormControl('1',[Validators.required]),
    "id_detalle": new FormControl('10',[Validators.required]),
    "cantidad": new FormControl('4',[Validators.required]),
     "largoCM": new FormControl('100',[Validators.required]),
     "anchoCM": new FormControl('50',[Validators.required]),
     "altoCM":new FormControl('40',[Validators.required]),
     "peso_kg": new FormControl('65.5',[Validators.required]),
  });
   }

  ngOnInit(): void {
    this.listar(0);
    this.getBrands();

  }

  getBrands(){
    this.brandsList = [];

    this.quoteSvc.getBrands().subscribe( (response:any)=>{

      if(response.body.list.length > 0){
        this.brandsList = response.body.list;
     }
     return
    });
  };

  listar(idquote: number){
    this.dataSource.data = [];

    if( idquote == 0){
    return;
    };

    this.quoteSvc.getQuotes(idquote).subscribe( (response:any)=>{
      let arr0: any [] = [];
      arr0 = response.body.list;

      const ELEMENTDATA = new Array();

      arr0.forEach((element, index)=>{
        element.index = index + 1;
        element.peso_total = this.decimales(element.peso_total,2);
        element.costo_unitario = this.decimales(element.costo_unitario,2);
        element.costo_total = this.decimales(element.costo_total,2);
        element.ajuste200USD = this.decimales(element.ajuste200USD,2);
        element.costoLandedUSD = this.decimales(element.costoLandedUSD,2);
        element.preciolistaCOP = this.decimales(element.preciolistaCOP,2);
        element.preciototal = this.decimales(element.preciototal,2);
        ELEMENTDATA.push(element);
      });

      this.dataSource.data = ELEMENTDATA;
    });

    return
  };




  decimales( num: number, dec: number){
    return Number(Number(num).toFixed(dec));
  }


  getRefs(){

    const brand = this.formBrands.get('selectedBrand').value;
    this.refsList = [];

    this.quoteSvc.getRefs(brand).subscribe( (response:any)=>{

      if(response.body.list.length > 0){
      this.refsList =response.body.list;
      };
      return

    });

  }

createQuote(){
const cliente = this.formBrands.get('cliente').value;

if (cliente == ''){
  this.statusForms = false;
  return;

} else {

  this.quoteSvc.createQuote(cliente).subscribe( (response:any)=>{
    this.statusForms = false;
    if (response.body.id_quote > 0){
      this.id_quote = Number(response.body.id_quote);
      this.statusForms = true;
      return
    }
   return
  });

}
  };

  createQuoteDet(){
    this.formQuoteDet.get('id_cotizacion').setValue(this.id_quote)
    const idDetalle = this.formBrands.get('part-number').value;
    this.formQuoteDet.get('id_detalle').setValue(idDetalle);
     this.quoteSvc.createQuoteDet(this.formQuoteDet.value).subscribe( (response:any)=>{

      const bd =  {
        "id_detalle": idDetalle,
        "id_cotdetalle": response.body.id_quote_detail
          };
          this.quoteSvc.generateQuote(bd).subscribe( (response:any)=>{
            console.log(response);
            this.listar(this.id_quote);

          });


      });


  }



}
