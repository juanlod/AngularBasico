import { Component, OnInit } from '@angular/core';
import { FacturasService } from 'src/app/servicios/facturas.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  facturas: any[] = [];
  campoBusqueda; campoFecha: FormControl;

  busqueda: any;
  cargando = true;
  resultados = false;
  noresultados = false;

  pageActual: number = 1;

  numeros: number[] = [5, 10, 15, 20, 50, 100, 200];
  numero: number = 10;

  sortedData: any[] = [];

  public sortBy = 'proveedor';
  public sortOrder = 'asc';

  

  constructor(private facturasService: FacturasService) {
    this.mostrarTodo();
    this.sortedData = this.facturas.slice();
   }

   //metodo que va a ordenar los datos
   sortData(sort: Sort) {
    const data = this.facturas.slice();
    //Si la ordenacion no está activa o el sentido de ordenación no tiene valor
    //Se devuelven los datos sin ordenar
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    //Si se ha activado la ordenacioón
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      //Se comparan los valores, si se selecciona ascendente,
      //se ordenan de manera ascendente y viceversa.
      switch (sort.active) {
        case 'proveedor': return compare(a.proveedor, b.proveedor, isAsc);
        case 'fecha': return compare(a.fecha, b.fecha, isAsc);
        case 'concepto': return compare(a.concepto, b.concepto, isAsc);
        case 'base': return compare(a.base, b.base, isAsc);
        case 'iva': return compare(a.iva, b.iva, isAsc);
        case 'total': return compare(a.total, b.total, isAsc);
        default: return 0;
      }
    });
  }




  ngOnInit() {

    this.campoBusqueda = new FormControl();
    //cuando el campo busqueda recibe un valor
    //envia ese valor y se guarda en una variable
    this.campoBusqueda.valueChanges
      .subscribe(term => {
        this.busqueda = term;
        this.cargando = true;
        //si la longitud de la propiedad búsqueda es distinto de 0
        //se llama al método de busqueda del servicio de facturas
        //se recibirá un factura
        if (this.busqueda.length !== 0) {
          this.facturasService.getFacturasSearch(this.busqueda)
            //en cada búsqueda se vacía el array de facturas
            .subscribe(facturas => {
              this.facturas = [];
              this.sortedData = [];
              // tslint:disable-next-line:forin
              for (const id$ in facturas) {
                const p = facturas[id$];
                p.id$ = id$;
                this.sortedData.push(facturas[id$]);
              }
              //si no encuentra nada
              if (this.facturas.length < 1 &&
                this.busqueda.length >= 1) {
                this.noresultados = true;

              } else {
                this.noresultados = false;
              }
            });
          this.cargando = false;
          this.resultados = true;
        } else {
          this.facturas = [];
          this.sortedData = [];
          this.cargando = false;
          this.resultados = false;
          this.mostrarTodo();
        }

      });


    this.campoFecha = new FormControl();
    //cuando el campo busqueda recibe un valor
    //envia ese valor y se guarda en una variable
    this.campoFecha.valueChanges
      .subscribe(term => {
        this.busqueda = term;
        this.cargando = true;
        //si la longitud de la propiedad búsqueda es distinto de 0
        //se llama al método de busqueda del servicio de presupuestos
        //se recibirá un presupuesto
        if (this.busqueda.length !== 0) {
          this.facturasService.getFacturasSearchFecha(this.busqueda)
            //en cada búsqueda se vacía el array de presupuestos
            .subscribe(facturas => {
              this.facturas = [];
              this.sortedData = [];
              // tslint:disable-next-line:forin
              for (const id$ in facturas) {
                const p = facturas[id$];
                p.id$ = id$;
                this.sortedData.push(facturas[id$]);
              }
              //si no encuentra nada
              if (this.facturas.length < 1 &&
                this.busqueda.length >= 1) {
                this.noresultados = true;
              } else {
                this.noresultados = false;
              }
            });
          this.cargando = false;
          this.resultados = true;
        } else {
          this.facturas = [];
          this.sortedData = [];
          this.cargando = false;
          this.resultados = false;
          this.mostrarTodo();
        }


      });

  }

  eliminarFactura(id$) {
    this.facturasService.delFactura(id$)
      .subscribe(res => {
        this.facturas = [];
        this.facturasService.getFacturas()
        .subscribe(facturas => {
          // tslint:disable-next-line:forin
          for (const id$ in facturas) {
            const p = facturas[id$];
            p.id$ = id$;
            this.facturas.push(facturas[id$]);
          }
        });
      });
  }
  mostrarTodo() {
    this.facturasService.getFacturas()
        .subscribe(facturas => {
          // tslint:disable-next-line:forin
          for ( const id$ in facturas) {
            const f = facturas[id$];
            f.id$ = id$;
            this.facturas.push(facturas[id$]);
            this.sortedData.push(facturas[id$]);
          }
          this.cargando = false;
          return this.sortedData;
        });

  }
}
//función para comparar valores y el sentido de la ordenación
//
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
