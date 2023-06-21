import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxCsvParser , NgxCSVParserError} from 'ngx-csv-parser';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UploadFilesService } from 'src/app/services/upload-files.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {
  csvRecords: any;
  header: boolean = true;
  arrTitles:any[] = [];
  arrRows:any[] = [];
  registros:number =0;
  tableSelected:string="";
  arrzp:any[] = [];
  abv:string="";
  arridTools:any[] = [];
  arridZonas:any[] = [];
  arridCoins:any[] = [];
  arridZonaCoins:any[] = [];
  arridProveedores:any[] = [];
  inputFile: boolean = true;

  public formHerramientas: any;
  public formListaDetalle: any;
  public formMonedas: any;
  public formParametros: any;
  public formProveedores: any;
  public formRangos: any;
  public formTarifas: any;
  public formTrm: any;
  public formUsuario: any;
  public formVartarifas: any;
  public formZonaMoneda: any;
  public formZonaProveedor: any;
  public formZonas: any;
  constructor(private ngxCsvParser: NgxCsvParser, private uploadSvc:UploadFilesService) {
    this.formHerramientas = new FormGroup({
      'id_herramienta' : new FormControl('',[Validators.required]),
      'descripcion' : new FormControl('',[Validators.required]),
      'estado' : new FormControl('',[Validators.required])
    });
    this.formListaDetalle = new FormGroup({
      'id_detalle' : new FormControl('',[Validators.required]),
      'id_zp' : new FormControl('',[Validators.required]),
      'id_herramienta' : new FormControl('',[Validators.required]),
      'part_number' : new FormControl('',[Validators.required]),
      'costo' : new FormControl('',[Validators.required]),
      'estado' : new FormControl('',[Validators.required])
    });

    this.formMonedas = new FormGroup({
      'id_moneda' : new FormControl('',[Validators.required]),
      'moneda' : new FormControl('',[Validators.required]),
      'estado' : new FormControl('',[Validators.required])
    });

    this.formParametros = new FormGroup({
      'id_parametro' : new FormControl('',[Validators.required]),
      'descripcion' : new FormControl('',[Validators.required]),
      'valor' : new FormControl('',[Validators.required]),
      'estado' : new FormControl('',[Validators.required])
    });

    this.formProveedores = new FormGroup({
      'id_proveedor' : new FormControl('',[Validators.required]),
      'proveedor' : new FormControl('',[Validators.required]),
      'estado' : new FormControl('',[Validators.required])
    });

    this.formRangos = new FormGroup({
      'id_rango' : new FormControl('',[Validators.required]),
      'rango_min' : new FormControl('',[Validators.required]),
      'rango_max' : new FormControl('',[Validators.required]),
      'mark_up' : new FormControl('',[Validators.required]),
      'estado' : new FormControl('',[Validators.required])
    });

    this.formTarifas = new FormGroup({
      'id_tarifa' : new FormControl('',[Validators.required]),
      'id_zona' : new FormControl('',[Validators.required]),
      'peso_min' : new FormControl('',[Validators.required]),
      'peso_max' : new FormControl('',[Validators.required]),
      'tarifa' : new FormControl('',[Validators.required]),
      'estado': new FormControl('',[Validators.required])
    });

    this.formTrm = new FormGroup({
      'id_trm' : new FormControl('',[Validators.required]),
      'id_moneda' : new FormControl('',[Validators.required]),
      'valor' : new FormControl('',[Validators.required]),
      'tasaUsd' : new FormControl('',[Validators.required]),
      'estado': new FormControl('',[Validators.required])
    });
    this.formUsuario = new FormGroup({
      'id_usuario' : new FormControl('',[Validators.required]),
      'identificacion' : new FormControl('',[Validators.required]),
      'username' : new FormControl('',[Validators.required]),
      'nombre' : new FormControl('',[Validators.required]),
      'apellido' : new FormControl('',[Validators.required]),
      'pass' : new FormControl('',[Validators.required]),
      'rol' : new FormControl('',[Validators.required]),
      'estado': new FormControl('',[Validators.required])
    });
    this.formVartarifas = new FormGroup({
      'id_vartarifa' : new FormControl('',[Validators.required]),
      'id_zona' : new FormControl('',[Validators.required]),
      'peso_min' : new FormControl('',[Validators.required]),
      'peso_max' : new FormControl('',[Validators.required]),
      'tarifa' : new FormControl('',[Validators.required]),
      'estado': new FormControl('',[Validators.required])
    });
    this.formZonaMoneda = new FormGroup({
      'id_zm' : new FormControl('',[Validators.required]),
      'id_moneda' : new FormControl('',[Validators.required]),
      'id_zona' : new FormControl('',[Validators.required]),
      'estado': new FormControl('',[Validators.required])
    });
    this.formZonaProveedor = new FormGroup({
      'id_zp' : new FormControl('',[Validators.required]),
      'id_zm' : new FormControl('',[Validators.required]),
      'id_proveedor' : new FormControl('',[Validators.required]),
      'estado': new FormControl('',[Validators.required])
    });

    this.formZonas = new FormGroup({
      'id_zona' : new FormControl('',[Validators.required]),
      'zona' : new FormControl('',[Validators.required]),
      'transportadora' : new FormControl('',[Validators.required]),
      'estado': new FormControl('',[Validators.required])
    });



   }

  @ViewChild('fileImportInput') fileImportInput: any;

  ngOnInit(): void {

  this.getZonaProveedor();
  this.getIdZonas();
  this.getIdMonedas();
  this.getIdZonaMoneda();
  this.getIdProveedores();

  }

  fileChangeListener($event: any): void {
    this.registros = 0;
    const files = $event.srcElement.files;
    this.header = (this.header as unknown as string) === 'true' || this.header === true;

    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ';' })
      .pipe().subscribe({
        next: (result): void => {

          this.csvRecords =  result;
          //this.arrTitles = Object.keys(this.csvRecords[0]);
          this.registros = this.csvRecords.length;
          this.cargarTabla( this.csvRecords);
        },
        error: (error: NgxCSVParserError): void => {
          console.log('Error', error);
        }
      });
  }

  cargarTabla(arr:any){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Espere por favor...'

    });
    Swal.showLoading()

     const data = JSON.stringify(arr);
      this.uploadSvc.postTables(data, this.tableSelected).subscribe( (response:any)=>{

      if(response.status == 201){
        Swal.fire({
          allowOutsideClick: true,
          icon: 'error',
          title: 'Error',
          text: response.body.msg
           });
          return
      };

      this.getTable();

      Swal.fire({
        allowOutsideClick: true,
        icon: 'info',
        title: 'Info',
        text: response.body.message
         });
      })

  };

  getTable(){
    this.arrTitles= [];
    this.arrRows= [];

    this.inputFile = this.tableSelected == 'Listadetalle' || this.tableSelected == 'Tarifas' || this.tableSelected =='DescuentosVolumen'? false : true;

    if (!this.inputFile){

      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text:'Espere por favor...'

      });

      Swal.showLoading()

       const data = '[]';
        this.uploadSvc.postTables(data, this.tableSelected).subscribe( (response:any)=>{
          //console.log({response});

        if(response.status == 201){
          Swal.fire({
            allowOutsideClick: true,
            icon: 'error',
            title: 'Error',
            text: response.body.msg
             });
            return
        };


        Swal.fire({
          allowOutsideClick: true,
          icon: 'info',
          title: 'Info',
          text: response.body.message
           });
        })

      return;
    }

    this.uploadSvc.getTable(this.tableSelected).subscribe( (response:any)=>{

      this.arrTitles = Object.keys(JSON.parse(response.body.data)[0]);
      this.arrTitles.push('Acciones');

      if(this.tableSelected == "Usuarios"){
        const index = 7;
        this.arrTitles.splice(index, 1);

      };

      this.arrRows = JSON.parse(response.body.data);

      });
  }

  getTool(id_herramienta:any, descripcion:any, estado:any){

    this.formHerramientas.get('id_herramienta').setValue(id_herramienta);
    this.formHerramientas.get('descripcion').setValue(descripcion);
    this.formHerramientas.get('estado').setValue(estado);

  }

  updateTool(){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Espere por favor...'

    });
    Swal.showLoading()
    this.uploadSvc.updateTools(this.formHerramientas.value).subscribe( (response:any)=>{

       if (response.status == 201){
        Swal.fire({
          allowOutsideClick: true,
          icon: 'error',
          title: 'Error',
          text: response.body.msg
           });
          return;

       };

       this.getTable();

       Swal.fire({
        allowOutsideClick: true,
        icon: 'info',
        title: 'Info',
        text: response.body.msg
         });
      });




     };

  getZonaProveedor(){
    this.uploadSvc.getZonaProveedor().subscribe( (response:any)=>{

     this.arrzp = response.body.data;

    });
  }

  getListaDetalle(id_detalle:any,idzp:any, id_herramienta:any, part_number:any,costo:any, estado:any){
    this.formListaDetalle.get('id_detalle').setValue(id_detalle);
    this.formListaDetalle.get('id_zp').setValue(idzp);
    this.formListaDetalle.get('id_herramienta').setValue(id_herramienta);
    this.formListaDetalle.get('part_number').setValue(part_number);
    this.formListaDetalle.get('costo').setValue(costo);
    this.formListaDetalle.get('estado').setValue(estado);

    console.log(this.formListaDetalle.value);


  }



  updateListDetail(){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Espere por favor...'

    });
    Swal.showLoading()
    this.uploadSvc.updateListDetail(this.formListaDetalle.value).subscribe( (response:any)=>{

       if (response.status == 201){
        Swal.fire({
          allowOutsideClick: true,
          icon: 'error',
          title: 'Error',
          text: response.body.msg
           });
          return;

       };

       this.getTable();

       Swal.fire({
        allowOutsideClick: true,
        icon: 'info',
        title: 'Info',
        text: response.body.msg
         });
      });




     };

  getCoin(id_moneda:any, moneda:any, estado:any){

      this.formMonedas.get('id_moneda').setValue(id_moneda);
      this.formMonedas.get('moneda').setValue(moneda);
      this.formMonedas.get('estado').setValue(estado);

    }

  updateCoin(){
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text:'Espere por favor...'

      });
      Swal.showLoading()
      this.uploadSvc.updateCoin(this.formMonedas.value).subscribe( (response:any)=>{

         if (response.status == 201){
          Swal.fire({
            allowOutsideClick: true,
            icon: 'error',
            title: 'Error',
            text: response.body.msg
             });
            return;

         };

         this.getTable();

         Swal.fire({
          allowOutsideClick: true,
          icon: 'info',
          title: 'Info',
          text: response.body.msg
           });
        });



       };

  getParametro(id_parametro:any, descripcion:any, valor:any, estado:any ){

      this.formParametros.get('id_parametro').setValue(id_parametro);
      this.formParametros.get('descripcion').setValue(descripcion);
      this.formParametros.get('valor').setValue(valor);
      this.formParametros.get('estado').setValue(estado);
    }

  updateParametro(){
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text:'Espere por favor...'

      });
      Swal.showLoading()
      this.uploadSvc.updateParemetro(this.formParametros.value).subscribe( (response:any)=>{

         if (response.status == 201){
          Swal.fire({
            allowOutsideClick: true,
            icon: 'error',
            title: 'Error',
            text: response.body.msg
             });
            return;

         };

         this.getTable();

         Swal.fire({
          allowOutsideClick: true,
          icon: 'info',
          title: 'Info',
          text: response.body.msg
           });
        });



       };

  getProveedor(id_proveedor:any,proveedor:any, estado:any){
    this.formProveedores.get('id_proveedor').setValue(id_proveedor);
    this.formProveedores.get('proveedor').setValue(proveedor);
    this.formProveedores.get('estado').setValue(estado);
  }

  updateProveedor(){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Espere por favor...'

    });
    Swal.showLoading()
    this.uploadSvc.updateProveedor(this.formProveedores.value).subscribe( (response:any)=>{

       if (response.status == 201){
        Swal.fire({
          allowOutsideClick: true,
          icon: 'error',
          title: 'Error',
          text: response.body.msg
           });
          return;

       };

       this.getTable();

       Swal.fire({
        allowOutsideClick: true,
        icon: 'info',
        title: 'Info',
        text: response.body.msg
         });
      });



     };

  getRango(id_rango:any,rango_min:any,rango_max:any, mark_up:any, estado:any){

    this.formRangos.get('id_rango').setValue(id_rango);
    this.formRangos.get('rango_min').setValue(rango_min);
    this.formRangos.get('rango_max').setValue(rango_max);
    this.formRangos.get('mark_up').setValue(mark_up);
    this.formRangos.get('estado').setValue(estado);

  }

  updateRango(){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Espere por favor...'

    });
    Swal.showLoading()
    this.uploadSvc.updateRango(this.formRangos.value).subscribe( (response:any)=>{

       if (response.status == 201){
        Swal.fire({
          allowOutsideClick: true,
          icon: 'error',
          title: 'Error',
          text: response.body.msg
           });
          return;

       };

       this.getTable();

       Swal.fire({
        allowOutsideClick: true,
        icon: 'info',
        title: 'Info',
        text: response.body.msg
         });
      });



     };


  getTarifa(id_tarifa:number,id_zona: number,peso_min:number,peso_max:number, tarifa:number, estado:number){
      this.formTarifas.get('id_tarifa').setValue(id_tarifa);
      this.formTarifas.get('id_zona').setValue(id_zona);
      this.formTarifas.get('peso_min').setValue(peso_min);
      this.formTarifas.get('peso_max').setValue(peso_max);
      this.formTarifas.get('tarifa').setValue(tarifa);
      this.formTarifas.get('estado').setValue(estado);
      console.log(this.formTarifas.value);
     };

  getIdZonas(){
      this.uploadSvc.getTable("Zonas").subscribe( (response:any)=>{
        this.arridZonas = JSON.parse(response.body.data);
      });
    };

  updateTarifa(){
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text:'Espere por favor...'

      });
      Swal.showLoading()
      this.uploadSvc.updateTarifa(this.formTarifas.value).subscribe( (response:any)=>{

         if (response.status == 201){
          Swal.fire({
            allowOutsideClick: true,
            icon: 'error',
            title: 'Error',
            text: response.body.msg
             });
            return;

         };

         this.getTable();

         Swal.fire({
          allowOutsideClick: true,
          icon: 'info',
          title: 'Info',
          text: response.body.msg
           });
        });



       };

  getTrm(id_trm:number, id_moneda:string,valor: number, tasaUsd:number, estado:number){

    this.formTrm.get('id_trm').setValue(id_trm);
    this.formTrm.get('id_moneda').setValue(id_moneda);
    this.formTrm.get('valor').setValue(valor);
    this.formTrm.get('tasaUsd').setValue(tasaUsd);
    this.formTrm.get('estado').setValue(estado);

    console.log(this.formTrm.value);
  }

  getIdMonedas(){
    this.uploadSvc.getTable("Monedas").subscribe( (response:any)=>{
      this.arridCoins = JSON.parse(response.body.data);
    });
  };

  updateTrm(){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Espere por favor...'

    });
    Swal.showLoading()
    this.uploadSvc.updateTrm(this.formTrm.value).subscribe( (response:any)=>{

       if (response.status == 201){
        Swal.fire({
          allowOutsideClick: true,
          icon: 'error',
          title: 'Error',
          text: response.body.msg
           });
          return;

       };

       this.getTable();

       Swal.fire({
        allowOutsideClick: true,
        icon: 'info',
        title: 'Info',
        text: response.body.msg
         });
      });



     };

     getUsuario(
      id_usuario: number,
      identificacion:string,
      username:string,
      nombre:string,
      apellido:string,
      rol:number,
      estado:number

      ){
      this.formUsuario.get('id_usuario').setValue(id_usuario);
      this.formUsuario.get('identificacion').setValue(identificacion);
      this.formUsuario.get('username').setValue(username);
      this.formUsuario.get('nombre').setValue(nombre);
      this.formUsuario.get('apellido').setValue(apellido);
      this.formUsuario.get('pass').setValue('');
      this.formUsuario.get('rol').setValue(rol);
      this.formUsuario.get('estado').setValue(estado);
      console.log(this.formUsuario.value);
     }

     updateUsuario(){
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text:'Espere por favor...'

      });
      Swal.showLoading()
      this.uploadSvc.updateUser(this.formUsuario.value).subscribe( (response:any)=>{

         if (response.status == 201){
          Swal.fire({
            allowOutsideClick: true,
            icon: 'error',
            title: 'Error',
            text: response.body.msg
             });
            return;

         };

         this.getTable();

         Swal.fire({
          allowOutsideClick: true,
          icon: 'info',
          title: 'Info',
          text: response.body.msg
           });
        });



       };


getVartarifa(id_tarifa:number,id_zona: number,peso_min:number,peso_max:number, tarifa:number, estado:number){
        this.formVartarifas.get('id_vartarifa').setValue(id_tarifa);
        this.formVartarifas.get('id_zona').setValue(id_zona);
        this.formVartarifas.get('peso_min').setValue(peso_min);
        this.formVartarifas.get('peso_max').setValue(peso_max);
        this.formVartarifas.get('tarifa').setValue(tarifa);
        this.formVartarifas.get('estado').setValue(estado);
        console.log(this.formVartarifas.value);
       };

updateVartarifa(){
        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          text:'Espere por favor...'

        });
        Swal.showLoading()
        this.uploadSvc.updateVartarifa(this.formVartarifas.value).subscribe( (response:any)=>{

           if (response.status == 201){
            Swal.fire({
              allowOutsideClick: true,
              icon: 'error',
              title: 'Error',
              text: response.body.msg
               });
              return;

           };

           this.getTable();

           Swal.fire({
            allowOutsideClick: true,
            icon: 'info',
            title: 'Info',
            text: response.body.msg
             });
          });

         };


getZonaMoneda(id_zm:number,id_moneda:string,id_zona:number, estado:number){

  this.formZonaMoneda.get('id_zm').setValue(id_zm);
  this.formZonaMoneda.get('id_moneda').setValue(id_moneda);
  this.formZonaMoneda.get('id_zona').setValue(id_zona);
  this.formZonaMoneda.get('estado').setValue(estado);
  console.log(this.formZonaMoneda.value);


}

updateZonaMoneda(){
  Swal.fire({
    allowOutsideClick: false,
    icon: 'info',
    text:'Espere por favor...'

  });
  Swal.showLoading()
  this.uploadSvc.updateZonaMoneda(this.formZonaMoneda.value).subscribe( (response:any)=>{

     if (response.status == 201){
      Swal.fire({
        allowOutsideClick: true,
        icon: 'error',
        title: 'Error',
        text: response.body.msg
         });
        return;

     };

     this.getTable();

     Swal.fire({
      allowOutsideClick: true,
      icon: 'info',
      title: 'Info',
      text: response.body.msg
       });
    });

   };

getZonaProv(id_zp:number,id_zm:number,id_proveedor:string, estado:number){

    this.formZonaProveedor.get('id_zp').setValue(id_zp);
    this.formZonaProveedor.get('id_zm').setValue(id_zm);
    this.formZonaProveedor.get('id_proveedor').setValue(id_proveedor);
    this.formZonaProveedor.get('estado').setValue(estado);

    console.log(this.formZonaProveedor.value);
  }

  getIdZonaMoneda(){
    this.uploadSvc.getTable("Zona_Moneda").subscribe( (response:any)=>{
      this.arridZonaCoins = JSON.parse(response.body.data);
    });
  };

  getIdProveedores(){
    this.uploadSvc.getTable("Proveedores").subscribe( (response:any)=>{
      this.arridProveedores = JSON.parse(response.body.data);
    });
  };

  updateZonaProveedor(){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Espere por favor...'

    });
    Swal.showLoading()
    this.uploadSvc.updateZonaProveedor(this.formZonaProveedor.value).subscribe( (response:any)=>{

       if (response.status == 201){
        Swal.fire({
          allowOutsideClick: true,
          icon: 'error',
          title: 'Error',
          text: response.body.msg
           });
          return;

       };

       this.getTable();

       Swal.fire({
        allowOutsideClick: true,
        icon: 'info',
        title: 'Info',
        text: response.body.msg
         });
      });

     };

  getZona(id_zona:number,zona:string, transportadora:string,estado:number){

  this.formZonas.get('id_zona').setValue(id_zona);
  this.formZonas.get('zona').setValue(zona);
  this.formZonas.get('transportadora').setValue(transportadora);
  this.formZonas.get('estado').setValue(estado);

  console.log(this.formZonas.value);
}

updateZonas(){
  Swal.fire({
    allowOutsideClick: false,
    icon: 'info',
    text:'Espere por favor...'

  });
  Swal.showLoading()
  this.uploadSvc.updateZonas(this.formZonas.value).subscribe( (response:any)=>{

     if (response.status == 201){
      Swal.fire({
        allowOutsideClick: true,
        icon: 'error',
        title: 'Error',
        text: response.body.msg
         });
        return;

     };

     this.getTable();

     Swal.fire({
      allowOutsideClick: true,
      icon: 'info',
      title: 'Info',
      text: response.body.msg
       });
    });

   };


};
