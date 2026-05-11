import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataTable } from 'src/app/common/models/IDataTable';
import { Utilities } from 'src/app/common/Utilities';
import { ReportsService } from 'src/app/services/reports.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  cantRegistros = [10, 30, 50];
  registrosXPagina = this.cantRegistros[0];
  totalRegistros: number = 0;
  paginaActual: number = 1;
  paginas: Array<number> = [];
  paginasMostrar: Array<number> = [];
  colsan: number = 0;
  buttons: any;
  datatable: DataTable;
  showPages: boolean = false;
  nextFunction: boolean = false;
  lastPageFlag: boolean = false;
  showForm: boolean = false;
  searchForm: FormGroup;
  utils:any = new Utilities();

  constructor(private reportSvc:ReportsService) {

    this.searchForm = new FormGroup({
      'ordenarPor': new FormControl("Marca"),
      'dirOrden': new FormControl("ASC"),
      'pageNumer': new FormControl(1),
      'pageSize': new FormControl(10),
      'almacen' : new FormControl(null),
      'marca' : new FormControl(null),
      'referencia' : new FormControl(null),
      'descripcion' : new FormControl(null),
      'fechaEI' : new FormControl(null),
      'fechaEF': new FormControl(null),
      'fechaSI': new FormControl(null),
      'fechaSF': new FormControl(null),
      'operacion': new FormControl(null)
    });

    this.datatable = {
      headerRows: {
                    Fecha_Reporte: "Reporte de:",
                    Marca: "Marca",
                    Referencia: "Referencia",
                    Descripcion: "Descripcion",
                    Cantidad_Disponible: "Disponible",
                    Cantidad_Vendida: "Vendidas",
                    Fecha_Entrada: "Fecha Entrada",
                    Fecha_Salida: "Fecha Salida",
                    Almacen: "Almacen"
                   },
                    dataRows: []
    };

    this.buttons = {
      previous: false,
      next: false
    };
  }

  ngOnInit(): void {
    //this.firstPage();
  }

  generarReporte() {
    this.searchForm.get('operacion')?.setValue(1);
    this.onSubmit();
    this.showForm = true;
  };

  onSubmit() {
   Swal.fire({
             allowOutsideClick: false,
             icon: 'info',
             text:'Espere por favor...'

            });
    Swal.showLoading();

    this.searchForm.get('pageNumer')?.setValue(this.paginaActual);
    this.searchForm.get('pageSize')?.setValue(this.registrosXPagina);
    console.log({ valuesSubmit: this.searchForm.value });
    this.reportSvc.putReportStock(this.searchForm.value).subscribe((response: any) => {
      this.datatable.dataRows = response.body.datos;
      this.totalRegistros = response.body.TotalRegistros;
      this.paginas = this.utils.calcularCantidadPaginas(this.searchForm.value.pageSize, this.totalRegistros);
      this.verifyPaginationControls();

      if (this.paginas.length > 10) {
        this.showPages = true;
        const cadaDiez = this.paginas.filter((_, index) => (index + 1) % 10 === 0);
        const maxpage = Math.max(...this.paginas);
        if (!cadaDiez.includes(maxpage))cadaDiez.push(maxpage);

        //next
        if (cadaDiez.includes(this.paginaActual - 1)
          && this.paginaActual <= this.paginas.length
          && this.nextFunction) {
          const limInferior = this.paginaActual;
          const limSuperior = this.paginaActual + 9;
          this.paginasMostrar = [];
          for (let i = limInferior; i <= limSuperior && i <= this.paginas.length; i++) {
            this.paginasMostrar.push(i);
          };
        };

        //previous

        if ((cadaDiez.includes(this.paginaActual + 1)
          || this.paginaActual === 1)
          && this.paginaActual > 0
          && !this.nextFunction
        ) {
          const limInferior = this.paginaActual === 1?1:this.paginaActual - 8;
          const limSuperior = this.paginaActual === 1 ? this.paginaActual + 9 : this.paginaActual + 1;
          this.paginasMostrar = [];
          for (let i = limInferior; i <= limSuperior && i <= this.paginas.length; i++) {
              this.paginasMostrar.push(i);
          };
          if (this.lastPageFlag) { this.paginaActual = this.paginas.length };
        };

      } else {
        this.showPages = false;
      }
      Swal.close();
    });
  };

  onClear() {
    this.datatable.dataRows = [];
    this.paginas = [];
    return this.searchForm.reset();
  };

  verifyPaginationControls() {
    if (this.paginaActual < 1) {
      this.buttons.previous = true;
      this.buttons.next = false;
    };

    if (this.paginaActual >= this.paginas.length) {
      this.buttons.previous = false;
      this.buttons.next = true;
    };

    if (this.paginaActual > 1 && this.paginaActual < this.paginas.length) {
      this.buttons.previous = false;
      this.buttons.next = false;
    };

    if (this.paginas.length == 1) {
      this.buttons.previous = true;
      this.buttons.next = true;
    };
    console.log(this.buttons);
  };

  cambiarPagina(pagina: number) {
    this.paginaActual = pagina;
    this.searchForm.get('operacion')?.setValue(3);//consultar
    this.onSubmit();

  };

  previousPage() {
    this.nextFunction = false;
    this.lastPageFlag = false;
    this.cambiarPagina(this.paginaActual - 1);
  };

  nextPage() {
    this.nextFunction = true;
    this.cambiarPagina(this.paginaActual + 1);
  };

  firstPage() {
    this.nextFunction = false;
    this.lastPageFlag = false;
    this.cambiarPagina(1);
  };

  lastPage() {
    this.nextFunction = false;
    this.lastPageFlag = true;
    this.cambiarPagina(this.paginas.length - 1);
  };

  columnFunction(column: string) {
    this.searchForm.get('orderBy')?.setValue(column);
    const orderBy = this.searchForm.get('dirOrden')?.value === "ASC" ? "DESC" : "ASC";
    this.searchForm.get('dirOrden')?.setValue(orderBy);
    this.firstPage();
  };

  exportReport() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'

    });
    Swal.showLoading();

    //consultar
    this.searchForm.get('pageNumer')?.setValue(null);
    this.searchForm.get('pageSize')?.setValue(null);
    this.searchForm.get('operacion')?.setValue(2);

    console.log({ valuesExport: this.searchForm.value });
    this.reportSvc.putReportStock(this.searchForm.value).subscribe((response: any) => {

      const json = response.body.datos;
      console.log({ json });
      this.reportSvc.putGenerateCsv(json).subscribe((data: any) => {
        const csv = data.body.datos

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;

        const fecha = new Date();

        const anio = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const dia = String(fecha.getDate()).padStart(2, '0');
        const hora = String(fecha.getHours()).padStart(2, '0');
        const minutos = String(fecha.getMinutes()).padStart(2, '0');
        const segundos = String(fecha.getSeconds()).padStart(2, '0');

        // Código: AAAAMMDDHHMMSS
        const codigo = `${anio}${mes}${dia}${hora}${minutos}${segundos}`;

        a.download = `${codigo}.txt`;
        a.click();

        window.URL.revokeObjectURL(url);
        this.showForm = false;
        Swal.close();

      });
   });
 }
}
