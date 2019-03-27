import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { map, filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  provURL = 'https://comprasapp-b36b0.firebaseio.com/proveedores.json';
  proURL = 'https://comprasapp-b36b0.firebaseio.com/proveedores';

  proveedores: any = [];
  constructor(private http: Http) { }

  postProveedor(proveedor: any) {
    //crea una nueva factura convertida a json
    const newprov = JSON.stringify(proveedor);
    //crea las cabeceras de tipo json
    const headers = new Headers({
      'Content-Type': 'aplication/json'
    });

    //devuelve el resultado en formato json
    return this.http.post(this.provURL, newprov, { headers })
      .pipe(map(res => {
        console.log(res.json());
        return (res.json());
      }));
  }
  //método para obtener factura
  getProveedores() {
    //devuelve la respuesta contenida en la url en formato json
    return this.http.get(this.provURL)
      .pipe(map(
        res => res.json()
      ));
  }

  getProveedor(id$: string) {
    const url = `${this.proURL}/${id$}.json`;
    console.log(this.http.get(url).pipe(map(res => res.json())));
    return this.http.get(url).pipe(map(res => res.json()));
  }
  //editar factura
  putProveedor(proveedor: any, id$: string) {
    const newprov = JSON.stringify(proveedor);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = `${this.proURL}/${id$}.json`;
    return this.http.put(url, newprov, { headers })
      .pipe(map(res => {
        console.log(res.json());
        return res.json();
      }));
  }

  //borrar presupuesto
  delProveedor(id$: string) {
    const url = `${this.proURL}/${id$}.json`;
    return this.http.delete(url)
      .pipe(map(res => res.json()));
  }

  getProveedoresSearch(busqueda: string)  {
    //Se utiliza una url definida por firebase que contiene una query
    //con método gethttp
    const url = `${ this.provURL }?orderBy="nombre"&startAt="${ busqueda }"&endAt="${ busqueda }\uf8ff"`;
    return this.http.get(url)
       .pipe(map (res => res.json()));

    //A continuación se configura firebase
    //Se añade la regla
    //"proveedores": {
    //  ".indexOn": ["nombre"]
    //}
  }

  getProveedoresSearchTelefono(busqueda: string)  {
    //Se utiliza una url definida por firebase que contiene una query
    //con método gethttp
    // const url = `${ this.provURL }?orderBy="telefono"&equalTo=${ busqueda }&print=pretty`;
    const url = `${ this.provURL }?orderBy="telefono"&startAt="${ busqueda }"&endAt="${ busqueda }\uf8ff"`;
    return this.http.get(url)
       .pipe(map (res => res.json()));

  }

  getProveedoresSearchEmail(busqueda: string)  {
    //Se utiliza una url definida por firebase que contiene una query
    //con método gethttp
    const url = `${ this.provURL }?orderBy="email"&startAt="${ busqueda }"&endAt="${ busqueda }\uf8ff"`;
    return this.http.get(url)
       .pipe(map (res => res.json()));

  }



}
