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

  header: boolean = true;
  arrTitles:any[] = [];
  arrRows:any[] = [];
  tableSelected: string = "";
  buttonUser: boolean = false;

  public formUsuario: any;

  constructor(private ngxCsvParser: NgxCsvParser, private uploadSvc:UploadFilesService) {


    this.formUsuario = new FormGroup({
      'id_usuario' : new FormControl('',[Validators.required]),
      'identificacion' : new FormControl('',[Validators.required]),
      'username' : new FormControl('',[Validators.required]),
      'nombre' : new FormControl('',[Validators.required]),
      'apellido': new FormControl('', [Validators.required]),
      'telefono': new FormControl('', [Validators.required]),
      'celular': new FormControl('', [Validators.required]),
      'email' : new FormControl('',[Validators.required]),
      'pass' : new FormControl('',[Validators.required]),
      'rol' : new FormControl('',[Validators.required]),
      'estado': new FormControl('',[Validators.required])
    });

   }

  @ViewChild('fileImportInput') fileImportInput: any;

  ngOnInit(): void {
       this.uploadSvc.getTable("Tables_est").subscribe((response: any) => {
          this.arrTitles = Object.keys(JSON.parse(response.body.data)[0]);
          this.arrRows = JSON.parse(response.body.data);
       });
    }

    getTable(){
    this.arrTitles= [];
    this.arrRows = [];


      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text:'Espere por favor...'

      });

      Swal.showLoading()

      this.uploadSvc.putTables(this.tableSelected).subscribe((response: any) => {
        //console.log({response});

        if (response.status == 201) {
          Swal.fire({
            allowOutsideClick: true,
            icon: 'error',
            title: 'Error',
            text: response.body.msg
          });
          return
        };


        if (this.tableSelected != "Usuarios") {
          this.tableSelected = "Tables_est";
        };

        this.uploadSvc.getTable(this.tableSelected).subscribe((response: any) => {

          this.arrTitles = Object.keys(JSON.parse(response.body.data)[0]);

          if (this.tableSelected == "Usuarios") {
            let index = 1;
            this.arrTitles.splice(index, 2);
            index = 8;
            this.arrTitles.splice(index, 1);
            this.arrTitles.push('Acciones');
          };

          this.arrRows = JSON.parse(response.body.data);

      Swal.fire({
          allowOutsideClick: true,
          icon: 'info',
          title: 'Info',
          text: response.body.message
        });
       });
     });

     }

    getUsuario(
      id_usuario: number,
      identificacion:string,
      username:string,
      nombre:string,
      apellido: string,
      telefono: string,
      celular: string,
      email: string,
      rol:number,
      estado:number
      ){
      this.formUsuario.get('id_usuario').setValue(id_usuario);
      this.formUsuario.get('identificacion').setValue(identificacion);
      this.formUsuario.get('username').setValue(username);
      this.formUsuario.get('nombre').setValue(nombre);
      this.formUsuario.get('apellido').setValue(apellido);
      this.formUsuario.get('telefono').setValue(telefono);
      this.formUsuario.get('celular').setValue(celular);
      this.formUsuario.get('email').setValue(email);
      this.formUsuario.get('pass').setValue('');
      this.formUsuario.get('rol').setValue(rol);
      this.formUsuario.get('estado').setValue(estado);
      this.buttonStatus(false);
      console.log(this.formUsuario.value);
  }

  buttonStatus(status: boolean) {

    this.buttonUser = status;

    if (status) {
      this.formUsuario.reset();
    }

  }

  CreateUsuario() {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text:'Espere por favor...'

      });
      Swal.showLoading()
      this.uploadSvc.createUser(this.formUsuario.value).subscribe( (response:any)=>{

         if (response.status == 201){
          Swal.fire({
            allowOutsideClick: true,
            icon: 'error',
            title: 'Error',
            text: response.body.msg
             });
            return;

         };

       //  this.getTable();
    this.arrTitles= [];
    this.arrRows = [];

    this.uploadSvc.getTable("Usuarios").subscribe( (response:any)=>{

      this.arrTitles = Object.keys(JSON.parse(response.body.data)[0]);
      //this.arrTitles.push('Acciones');

      if(this.tableSelected == "Usuarios"){
        let index = 1;
        this.arrTitles.splice(index, 2);
        index = 8;
        this.arrTitles.splice(index, 1);

      };

      this.arrRows = JSON.parse(response.body.data);

         Swal.fire({
          allowOutsideClick: true,
          icon: 'info',
          title: 'Info',
          text: response.body.msg
           });
        });

      });

    };


  updateUsuario() {

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

       //  this.getTable();
    this.arrTitles= [];
    this.arrRows = [];

    this.uploadSvc.getTable("Usuarios").subscribe( (response:any)=>{

      this.arrTitles = Object.keys(JSON.parse(response.body.data)[0]);
      //this.arrTitles.push('Acciones');

      if(this.tableSelected == "Usuarios"){
        let index = 1;
        this.arrTitles.splice(index, 2);
        index = 8;
        this.arrTitles.splice(index, 1);

      };

      this.arrRows = JSON.parse(response.body.data);

              Swal.fire({
          allowOutsideClick: true,
          icon: 'info',
          title: 'Info',
          text: response.body.msg
           });
        });

      });

    };

};
