import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { map, filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  factURL = 'https://comprasapp-b36b0.firebaseio.com/facturas.json';
  facURL = 'https://comprasapp-b36b0.firebaseio.com/facturas';

  constructor(private http: Http) { }
  //método post para crear una nueva factura de cualquier tipo
  postFactura(factura: any) {
    //crea una nueva factura convertida a json
    const newfact = JSON.stringify(factura);
    //crea las cabeceras de tipo json
    const headers = new Headers({
      'Content-Type': 'aplication/json'
    });

    //devuelve el resultado en formato json
    return this.http.post(this.factURL, newfact, { headers })
      .pipe(map(res => {
        console.log(res.json());
        return (res.json());
      }));
  }

  //método para obtener factura
  getFacturas() {
    //devuelve la respuesta contenida en la url en formato json
    return this.http.get(this.factURL)
      .pipe(map(
        res => res.json()
      ));
  }

  getFactura(id$: string) {
    const url = `${this.facURL}/${id$}.json`;
    console.log(this.http.get(url).pipe(map(res => res.json())));
    return this.http.get(url).pipe(map(res => res.json()));
  }


  //editar factura
  putFactura(factura: any, id$: string) {
    const newfact = JSON.stringify(factura);
    const headers = new Headers({
      'Content-Type' : 'application/json'
    });
    const url = `${this.facURL}/${id$}.json`;
    return this.http.put(url, newfact, {headers})
      .pipe(map(res => {
        console.log(res.json());
        return res.json();
    }));
  }

   //borrar presupuesto
   delFactura( id$: string ) {
    const url = `${this.facURL}/${id$}.json`;
    return this.http.delete(url)
      .pipe(map( res => res.json()));
  }

  getFacturasSearch(busqueda: string)  {
    //Se utiliza una url definida por firebase que contiene una query
    //con método gethttp
    const url = `${ this.factURL }?orderBy="proveedor"&startAt="${ busqueda }"&endAt="${ busqueda }\uf8ff"`;
    return this.http.get(url)
       .pipe(map (res => res.json()));

    //A continuación se configura firebase
    //Se añade la regla
    //"proveedores": {
    //  ".indexOn": ["nombre"]
    //}
  }

  getFacturasSearchFecha(busqueda: string)  {
    //Se utiliza una url definida por firebase que contiene una query
    //con método gethttp
    const url = `${ this.factURL }?orderBy="fecha"&startAt="${ busqueda }"&endAt="${ busqueda }\uf8ff"`;
    return this.http.get(url)
       .pipe(map (res => res.json()));

  }

}
