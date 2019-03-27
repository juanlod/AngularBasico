import { Injectable } from '@angular/core';
import { Headers, Http, Response} from '@angular/http';
import { map, filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PresupuestosService {

  presURL = 'https://comprasapp-b36b0.firebaseio.com/presupuestos.json';
  preURL = 'https://comprasapp-b36b0.firebaseio.com/presupuestos';

constructor(private http: Http) { }

  //Write
  postPresupuesto(presupuesto: any) {
    const newpres = JSON.stringify(presupuesto);
    const headers = new Headers({
      'Content-type': 'application/json'
    });

    return this.http.post(this.presURL, newpres, {headers})
      .pipe(map(res => {
        console.log(res.json);
        return res.json();
      }));
  }

  //READ
  getPresupuestos() {
    return this.http.get( this.presURL)
      .pipe(map(
        res => res.json()
      ));
  }

  //antes de actualizar un registro se actualiza
  //id$ identifica registros en firebase
  getPresupuesto(id$: string) {
    //nueva url compuesta por la declarada arriba + id.json
    const url = `${this.preURL}/${id$}.json`;
    console.log(this.http.get(url).pipe(map(res => res.json())));
    return this.http.get(url).pipe(map(res => res.json()));
  }

  //editar presupuesto
  putPresupuesto(presupuesto: any, id$: string) {
    const newpre = JSON.stringify(presupuesto);
    const headers = new Headers({
      'Content-Type' : 'application/json'
    });
    const url = `${this.preURL}/${id$}.json`;
    return this.http.put(url, newpre, {headers})
      .pipe(map(res => {
        console.log(res.json());
        return res.json();
    }));
  }
  //borrar presupuesto
  delPresupuesto( id$: string ) {
    const url = `${this.preURL}/${id$}.json`;
    return this.http.delete(url)
      .pipe(map( res => res.json()));
  }


  getPresupuestosSearch(busqueda: string)  {
    //Se utiliza una url definida por firebase que contiene una query
    //con método gethttp
    const url = `${ this.presURL }?orderBy="proveedor"&startAt="${ busqueda }"&endAt="${ busqueda }\uf8ff"`;
    return this.http.get(url)
       .pipe(map (res => res.json()));

    //A continuación se configura firebase
    //Se añade la regla
    //"proveedores": {
    //  ".indexOn": ["nombre"]
    //}
  }

  getPresupuestosSearchFecha(busqueda: string)  {
    //Se utiliza una url definida por firebase que contiene una query
    //con método gethttp
    const url = `${ this.presURL }?orderBy="fecha"&startAt="${ busqueda }"&endAt="${ busqueda }\uf8ff"`;
    return this.http.get(url)
       .pipe(map (res => res.json()));

  }

}




