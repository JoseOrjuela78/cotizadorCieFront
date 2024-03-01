import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IQuote } from 'src/app/common/models/cotizacion';
import { QuotesService } from '../../services/quotes.service';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['Index','Part_number','Brand','Description','Cantidad','Peso_total','PrecioCop','PrecioRes','Preciototal','PrecioTotalRes','DtoCop','Dto%','Actions'];
  dataSource = new MatTableDataSource<IQuote>([]);
  clickedRows = new Set<IQuote>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  quoteDetList:any[] = [];
  quoteTotList:any[] = [];
  viewDta = {
    peso_real:0,
    zona:0,
    flete:0,
    moneda:'',
    ajuste200USD :0,
    costoLandedUSD :0,
    costo_unitario: 0,
    costo_total: 0
  };
  refsList:any[] = [];
  statusForms: Boolean = false;
  addButton:Boolean = true;
  cotizarButton:Boolean = true;
  id_quote: number = 0;
  total: number = 0;
  idRol:string ='';
  brandsList:any[] = [];

  public formBrands: any;
  public formQuoteDet: any;



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    }


  constructor(private quoteSvc: QuotesService, private auth: AuthService) {
  this.formBrands = new FormGroup({
    'searchPart' : new FormControl('',[Validators.required]),
    'cliente' : new FormControl('',[Validators.required]),
    'part-number' : new FormControl('',[Validators.required])
  });
  this.formQuoteDet = new FormGroup({

    "id_cotizacion" : new FormControl('',[Validators.required]),
    "id_cotdetalle" : new FormControl(''),
    "id_detalle": new FormControl('',[Validators.required]),
    "cantidad": new FormControl('',[Validators.required]),
     "largoCM": new FormControl('',[Validators.required]),
     "anchoCM": new FormControl('',[Validators.required]),
     "altoCM":new FormControl('',[Validators.required]),
     "peso_kg": new FormControl('',[Validators.required]),
  });
   }

  ngOnInit(): void {
    this.getbrands();
    this.listar(0);
    this.idRol = this.auth.leerRol();
    }

  listar(idquote: number){
    this.dataSource.data = [];

    if( idquote == 0){
    return;
    };

    this.quoteSvc.getQuotes(idquote).subscribe( (response:any)=>{
      this.total = response.body.total;
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
        element.preciolistaCOP = this.decimales(element.preciolistaCOP, 2);
        element.precioRescateCOP = this.decimales(element.precioRescateCOP, 2);
        element.preciototal = this.decimales(element.preciototal, 2);
        element.preciototalRescate = this.decimales(element.preciototalRescate, 2);
        element.descuentoCOP = this.decimales(element.descuentoCOP, 2);
        ELEMENTDATA.push(element);
      });

      console.log(ELEMENTDATA);
      this.dataSource.data = ELEMENTDATA;
    });

    return
  };

  decimales( num: number, dec: number){
    return Number(Number(num).toFixed(dec));
  }


  getRefs(){

    const key = this.formBrands.get('searchPart').value;
    this.refsList = [];

    this.quoteSvc.getRefs(key).subscribe( (response:any)=>{

      if(response.body.list.length > 0){
        this.refsList = response.body.list;
        console.log('refsList', this.refsList);
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
    } else {
      this.statusForms = false;
      return;

    }

  });

}
  };

  createQuoteDet(){

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Espere por favor...'

    });
    Swal.showLoading()

    this.cotizarButton = true;
    this.formQuoteDet.get('id_cotizacion').setValue(this.id_quote)
    const idDetalle:any = this.formBrands.get('part-number').value;
    this.formQuoteDet.get('id_detalle').setValue(idDetalle);

  if (this.formQuoteDet.status == 'INVALID'){
    Swal.fire({
      allowOutsideClick: true,
      icon: 'error',
      title: 'Error',
      text: 'Debe completar datos'
       });
       return
  }


  this.quoteSvc.cpeso(this.formQuoteDet.value).subscribe( (response:any)=>{


 if(response.body.code == 201){

  Swal.fire({
    allowOutsideClick: true,
    icon: 'error',
    title: 'Error',
    text: response.body.message
     });
     return
  };

 this.quoteSvc.createQuoteDet(this.formQuoteDet.value).subscribe( (response:any)=>{

  const bd =  {
    "id_detalle": idDetalle,
    "id_cotdetalle": response.body.id_quote_detail
      };
      this.quoteSvc.generateQuote(bd).subscribe( (response:any)=>{
        this.listar(this.id_quote);
        this.formQuoteDet.reset();
        Swal.close();

      });

  });

});

  };



updateQuoteDet(){
  Swal.fire({
    allowOutsideClick: false,
    icon: 'info',
    text:'Espere por favor...'

  });
  Swal.showLoading()
 this.quoteSvc.cpeso(this.formQuoteDet.value).subscribe( (response:any)=>{


    if(response.body.code == 201){

      Swal.fire({
        allowOutsideClick: true,
        icon: 'error',
        title: 'Error',
        text: response.body.message
         });
         return
      };

     this.quoteSvc.updateQuoteDet(this.formQuoteDet.value).subscribe( (response:any)=>{

       this.cotizarButton = false;
      const bd = JSON.parse(response.body.data);


          this.quoteSvc.generateQuote(bd).subscribe( (response:any)=>{
            this.listar(this.id_quote);
            this.formQuoteDet.reset();
            Swal.close();

          });

      });

  });

}





  closeQuote(){

    this.quoteDetList = [];

    this.quoteSvc.closeQuote(this.id_quote).subscribe((response: any) => {

      this.total = response.body.total;
      this.addButton = false;

      const arr = JSON.parse(response.body.rows);
      this.getTotalDto(this.id_quote);

/*
      if(arr.length){
        this.quoteDetList = arr;

        this.quoteDetList.forEach(Element =>{

        this.quoteTotList = [];

        this.quoteSvc.closeQuoteRow(Element.id_cotTotales,Element.id_cotizacion ).subscribe( (response:any)=>{

          this.quoteTotList = JSON.parse(response.body.rows);


          });


        });

      }

*/

    });


  };


  newQuote(){
    this.formBrands.reset();
    this.dataSource.data = [];
    this.quoteDetList = [];
    this.quoteTotList = [];
    this.refsList = [];
    this.statusForms = false;
    this.addButton = true;
    this.id_quote = 0;
    this.total = 0;
    this.clearViewData();
    this.formBrands.get('cliente').setValue('');
    return
  }

  deleteIdQuote(id:number){
     this.quoteSvc.deleteIdQuoete(id).subscribe( (response:any)=>{
      this.listar(this.id_quote);
     });
  };

  viewData(
    peso_real: number,
    zona: number,
    flete: number,
    moneda: string,
    ajuste200USD: number,
    costoLandedUSD: number,
    costo_unitario : number,
    costo_total: number
    ){

      this.viewDta.peso_real = peso_real;
      this.viewDta.zona = zona;
      this.viewDta.flete = flete;
      this.viewDta.moneda = moneda;
      this.viewDta.ajuste200USD = ajuste200USD;
      this.viewDta.costoLandedUSD = costoLandedUSD;
      this.viewDta.costo_unitario = costo_unitario;
      this.viewDta.costo_total = costo_total;
      return;

  }

  clearViewData(){
    this.viewDta.peso_real = 0;
    this.viewDta.zona = 0;
    this.viewDta.flete = 0;
    this.viewDta.moneda = '';
    this.viewDta.ajuste200USD = 0;
    this.viewDta.costoLandedUSD = 0;
    this.viewDta.costo_unitario = 0;
    this.viewDta.costo_total = 0;
  }

  editButton(
    id_cotdetalle: number,
    cantidad: number,
    largoCM: number,
    anchoCM: number,
    altoCM: number,
    peso_kg: number
    ){
    this.cotizarButton = false;
    this.formQuoteDet.get('id_cotdetalle').setValue(id_cotdetalle);
    this.formQuoteDet.get('cantidad').setValue(cantidad);
    this.formQuoteDet.get('largoCM').setValue(largoCM);
    this.formQuoteDet.get('anchoCM').setValue(anchoCM);
    this.formQuoteDet.get('altoCM').setValue(altoCM);
    this.formQuoteDet.get('peso_kg').setValue(peso_kg);
    return

  }


  getTotalDto(idQuote:number){
    this.quoteTotList = [];
    this.quoteSvc.gettotal(idQuote).subscribe( (response:any)=>{
      console.log({ "gettotal": response });
      this.quoteTotList = response.body.totalDto

    });

  }

  getbrands(){
    this.quoteSvc.getBrands().subscribe( (response:any)=>{

      this.brandsList = [];
      this.brandsList = response.body.list;


    });
  }

}
