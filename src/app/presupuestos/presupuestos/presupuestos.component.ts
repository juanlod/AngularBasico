import { PresupuestosService } from './../../servicios/presupuestos.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Sort } from '@angular/material/sort';


@Component({
  selector: 'app-presupuestos',
  templateUrl: './presupuestos.component.html',
  styleUrls: ['./presupuestos.component.css']
})
export class PresupuestosComponent implements OnInit {

  presupuestos: any = [];
  campoBusqueda; campoFecha: FormControl;

  busqueda: any;
  cargando = true;
  resultados = false;
  noresultados = false;

  pageActual: number = 1;
  sortedData: any[] = [];

  numeros: number[] = [5, 10, 15, 20, 50, 100, 200];
  numero: number = 10;

  public sortBy = 'proveedor';
  public sortOrder = 'asc';

  constructor(private presupuestosService: PresupuestosService) {

    this.mostrarTodo();

    this.sortedData = this.presupuestos.slice();
  }

    //metodo que va a ordenar los datos
    sortData(sort: Sort) {
      const data = this.presupuestos.slice();
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
        //se llama al método de busqueda del servicio de presupuestos
        //se recibirá un presupuesto
        if (this.busqueda.length !== 0) {
          this.presupuestosService.getPresupuestosSearch(this.busqueda)
            //en cada búsqueda se vacía el array de presupuestos
            .subscribe(presupuestos => {
              this.presupuestos = [];
              this.sortedData = [];
              // tslint:disable-next-line:forin
              for (const id$ in presupuestos) {
                const p = presupuestos[id$];
                p.id$ = id$;
                this.sortedData.push(presupuestos[id$]);
              }
              //si no encuentra nada
              if (this.presupuestos.length < 1 &&
                this.busqueda.length >= 1) {
                this.noresultados = true;

              } else {
                this.noresultados = false;
              }
            });
          this.cargando = false;
          this.resultados = true;
        } else {
          this.presupuestos = [];
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
          this.presupuestosService.getPresupuestosSearchFecha(this.busqueda)
            //en cada búsqueda se vacía el array de presupuestos
            .subscribe(presupuestos => {
              this.presupuestos = [];
              this.sortedData = [];
              // tslint:disable-next-line:forin
              for (const id$ in presupuestos) {
                const p = presupuestos[id$];
                p.id$ = id$;
                this.sortedData.push(presupuestos[id$]);
              }
              //si no encuentra nada
              if (this.presupuestos.length < 1 &&
                this.busqueda.length >= 1) {
                this.noresultados = true;
              } else {
                this.noresultados = false;
              }
            });
          this.cargando = false;
          this.resultados = true;
        } else {
          this.presupuestos = [];
          this.sortedData = [];
          this.cargando = false;
          this.resultados = false;
          this.mostrarTodo();
        }


      });
  }

  eliminarPresupuesto(id$) {
    this.presupuestosService.delPresupuesto(id$)
      .subscribe(res => {
        this.presupuestos = [];
        this.presupuestosService.getPresupuestos()
          .subscribe(presupuestos => {
            // tslint:disable-next-line:forin
            for (const id$ in presupuestos) {
              const p = presupuestos[id$];
              p.id$ = id$;
              this.presupuestos.push(presupuestos[id$]);
            }
          });
      });
  }

  mostrarTodo() {
    this.presupuestosService.getPresupuestos()
      .subscribe(presupuestos => {
        // tslint:disable-next-line:forin
        for (const id$ in presupuestos) {
          const p = presupuestos[id$];
          p.id$ = id$;
          this.presupuestos.push(presupuestos[id$]);
          this.sortedData.push(presupuestos[id$]);
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
