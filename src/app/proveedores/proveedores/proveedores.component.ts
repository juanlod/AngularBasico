import { ProveedoresService } from './../../servicios/proveedores.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {


  campoBusqueda: FormControl;
  campoCorreo: FormControl;
  campoTelefono: FormControl;

  busqueda: string;
  proveedores: any[] = [];

  cargando = true;
  resultados = false;
  noresultados = false;

  public sortBy = 'nombre';
  public sortOrder = 'asc';


  numeros: number[] = [5, 10, 15, 20, 50, 100, 200];
  numero = 10;

  pageActual = 1;
  sortedData: any[] = [];

  constructor(private proveedoresService: ProveedoresService) {

    this.mostrarTodo();

    //paginacion con material
    //se declara en el constructor la variable a guardar con el contenido a recorrer
    //el contenido a ordenar se guarda en una variable
    this.sortedData = this.proveedores.slice();

  }

  //metodo que va a ordenar los datos
  sortData(sort: Sort) {
    const data = this.proveedores.slice();
    //Si la ordenacion no está activa o el sentido de ordenación no tiene valor
    //Se devuelven los datos sin ordenar
    if (!sort.active || sort.direction === '') {
      this.sortedData = this.proveedores;
      return;
    }
    //Si se ha activado la ordenacioón
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      //Se comparan los valores, si se selecciona ascendente,
      //se ordenan de manera ascendente y viceversa.
      switch (sort.active) {
        case 'nombre': return compare(a.nombre, b.nombre, isAsc);
        case 'email': return compare(a.email, b.email, isAsc);
        case 'telefono': return compare(a.telefono, b.telefono, isAsc);
        case 'direccion': return compare(a.direccion, b.direccion, isAsc);
        case 'contacto': return compare(a.contacto, b.contacto, isAsc);
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
        //se llama al método de busqueda del servicio de proveedores
        //se recibirá un proveedor
        if (this.busqueda.length !== 0) {
          this.proveedoresService.getProveedoresSearch(this.busqueda)
            //en cada búsqueda se vacía el array de proveedores
            .subscribe(proveedores => {
              this.proveedores = [];
              this.sortedData = [];
              // tslint:disable-next-line:forin
              for (const id$ in proveedores) {
                const p = proveedores[id$];
                p.id$ = id$;
                this.sortedData.push(proveedores[id$]);
              }
              //si no encuentra nada
              if (this.proveedores.length < 1 &&
                this.busqueda.length >= 1) {
                this.noresultados = true;
              } else {
                this.noresultados = false;
              }
            });
          this.cargando = false;
          this.resultados = true;
        } else {
          this.proveedores = [];
          this.sortedData = []
          this.cargando = false;
          this.resultados = false;
          this.mostrarTodo();
        }

      });


    this.campoCorreo = new FormControl();
    //cuando el campo busqueda recibe un valor
    //envia ese valor y se guarda en una variable
    this.campoCorreo.valueChanges
      .subscribe(term => {
        this.busqueda = term;
        this.cargando = true;
        //si la longitud de la propiedad búsqueda es distinto de 0
        //se llama al método de busqueda del servicio de proveedores
        //se recibirá un proveedor
        if (this.busqueda.length !== 0) {
          this.proveedoresService.getProveedoresSearchEmail(this.busqueda)
            //en cada búsqueda se vacía el array de proveedores
            .subscribe(proveedores => {
              this.proveedores = [];
              this.sortedData = [];
              // tslint:disable-next-line:forin
              for (const id$ in proveedores) {
                const p = proveedores[id$];
                p.id$ = id$;
                this.sortedData.push(proveedores[id$]);
              }
              //si no encuentra nada
              if (this.proveedores.length < 1 &&
                this.busqueda.length >= 1) {
                this.noresultados = true;
              } else {
                this.noresultados = false;
              }
            });
          this.cargando = false;
          this.resultados = true;
        } else {
          this.proveedores = [];
          this.sortedData = [];
          this.cargando = false;
          this.resultados = false;
          this.mostrarTodo();
        }


      });


    this.campoTelefono = new FormControl();
    //cuando el campo busqueda recibe un valor
    //envia ese valor y se guarda en una variable
    this.campoTelefono.valueChanges
      .subscribe(term => {
        this.busqueda = term;
        this.cargando = true;
        //si la longitud de la propiedad búsqueda es distinto de 0
        //se llama al método de busqueda del servicio de proveedores
        //se recibirá un proveedor
        if (this.busqueda.length !== 0) {
          this.proveedoresService.getProveedoresSearchTelefono(this.busqueda)
            //en cada búsqueda se vacía el array de proveedores
            .subscribe(proveedores => {
              this.proveedores = [];
              this.sortedData = []
              // tslint:disable-next-line:forin
              for (const id$ in proveedores) {
                const p = proveedores[id$];
                p.id$ = id$;
                this.sortedData.push(proveedores[id$]);
              }
              //si no encuentra nada
              if (this.proveedores.length < 1 &&
                this.busqueda.length >= 1) {
                this.noresultados = true;
              } else {
                this.noresultados = false;
              }
            });
          this.cargando = false;
          this.resultados = true;
        } else {
          this.proveedores = [];
          this.sortedData = [];
          this.cargando = false;
          this.resultados = false;
          this.mostrarTodo();
        }

      });

  }




  mostrarTodo() {
    this.proveedoresService.getProveedores()
      .subscribe(proveedores => {
        // tslint:disable-next-line:forin
        for (const id$ in proveedores) {
          const p = proveedores[id$];
          p.id$ = id$;
          this.proveedores.push(proveedores[id$]);
          this.sortedData.push(proveedores[id$]);
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
