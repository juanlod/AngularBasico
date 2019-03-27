import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutenticacionService } from '../../servicios/autenticacion.service';
//Servicio de enrutado programática
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-inises',
  templateUrl: './inises.component.html',
  styleUrls: ['./inises.component.css']
})
export class InisesComponent implements OnInit {

  loginForm: FormGroup;
  userdata: any;

  mensaje = false;

  autenticando = false;

  constructor(private formBuilder: FormBuilder,
              private autenticacionService: AutenticacionService,
              private router: Router,
              private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.email, Validators.required]],
      'password': ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6)
       ]]
    });
  }

  onSubmit() {
    this.autenticando = true;
    this.userdata = this.saveUserdata();
    // se llama a authenticationservice para que le lleguen los
    // datos del usuario que está iniciando sesión
    this.autenticacionService.inicioSesion(this.userdata);
    //timeout para darle tiempo al servidor a responder
    setTimeout(() => {
      if (this.isAuth() === false) {
        this.mensaje = true;
        this.autenticando = false;
      }
    }, 2000);
  }

  saveUserdata() {
    const saveUserdata = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
    return saveUserdata;
  }

  isAuth() {
    return this.autenticacionService.isAuthenticated();
  }

}
