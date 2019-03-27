import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
//Control de login


@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(private router: Router,
    private activtedRouter: ActivatedRoute) { }

  //Crear usuarios
  registroUsuario(userdata) {
    //Librería de firebase

    firebase.auth().createUserWithEmailAndPassword(userdata.email, userdata.password)
      .catch(error => {
        console.log(error);
      });
  }

  //método inicio de sesión
  inicioSesion(userdata) {
    firebase.auth().signInWithEmailAndPassword(userdata.email, userdata.password)
      .then(response => {
        console.log(response);
        this.router.navigate(['/inicio']);
      })
      .catch(
        error => {
          console.log(error);
        }
      );
  }


  //Método para comprobar authenticacion
  isAuthenticated() {
    const user = firebase.auth().currentUser;
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    firebase.auth().signOut();
  }
}
