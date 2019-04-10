import { ProveedoresService } from './../../servicios/proveedores.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-editprove',
  templateUrl: './editprove.component.html',
  styleUrls: ['./editprove.component.css']
})
export class EditproveComponent implements OnInit {

  proveedorForm: FormGroup;
  proveedor: any;
  nombre: string;
  cif: any;
  direccion: any;
  cp: any;
  localidad: string;
  provincia: string;
  telefono: string;
  email: any;
  contacto: any;

  id: string;

  provincias: string[] = ['Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz',
    'Barcelona', 'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba',
    'La Coruña', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara', 'Guipúzcoa', 'Huelva', 'Huesca',
    'IslasBaleares', 'Jaén', 'León', 'Lérida', 'Lugo', 'Madrid', 'Málaga', 'Murcia', 'Navarra', 'Orense',
    'Palencia', 'Las Palmas', 'Pontevedra', 'La Rioja', 'Salamanca', 'Segovia', 'Sevilla', 'Soria',
    'Tarragona', 'Santa Cruz de Tenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya',
    'Zamora', 'Zaragoza'];

  constructor(private pform: FormBuilder,
              private router: Router,
              private proveedorService: ProveedoresService,
              private activatedRouter: ActivatedRoute) {

    this.activatedRouter.params
      .subscribe(parametros => {
        this.id = parametros['id'];
        this.proveedorService.getProveedor(this.id)
          .subscribe(proveedor => this.proveedor = proveedor);
      });
  }

  ngOnInit() {
    this.proveedorForm = this.pform.group({
      nombre: ['', [Validators.required, Validators.nullValidator, Validators.minLength(3), Validators.maxLength(200)]],
      cif:  ['', [Validators.required, Validators.nullValidator, Validators.minLength(9), Validators.maxLength(30),
         Validators.pattern (/^([ABCDngMNPQRSUVW, abcdefghjklmnpqrsuvw])(\d{7})([0-9A-J])$/)]],
      direccion: ['', [Validators.required, Validators.nullValidator, Validators.minLength(5), Validators.maxLength(200)]],
      cp: ['', [Validators.required, Validators.nullValidator, Validators.minLength(5), Validators.maxLength(70),
        Validators.pattern(/([0-9])(\d{4})$/)]],
      localidad: ['', [Validators.required, Validators.nullValidator, Validators.minLength(3), Validators.maxLength(200)]],
      provincia:  ['', [Validators.required] ],
      telefono:  ['', [Validators.required, Validators.minLength(9), Validators.maxLength(30),
         Validators.pattern(/^([6789])([0-9])(\d{7})$/)]],
      email: ['', [Validators.required, Validators.minLength(10), Validators.email, Validators.maxLength(70),
        Validators.pattern(/^([a-zA-Z0-9_])+([.][a-zA-Z0-9_]+)*@([a-zA-Z0-9_])+([.][a-zA-Z0-9_]+)*([.])([a-zA-Z]){1,5}$/)]],
      contacto:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(70)]]
    });
  }

  onSubmit() {
    this.proveedor = this.saveProveedor();
    this.proveedorService.putProveedor(this.proveedor, this.id)
      .subscribe(newprovee => {
        this.router.navigate(['/proveedores']);
      });
    this.proveedorForm.reset();
  }

  saveProveedor() {
    const saveProveedor = {
      nombre: this.proveedorForm.get('nombre').value,
      cif: this.proveedorForm.get('cif').value,
      direccion: this.proveedorForm.get('direccion').value,
      cp: this.proveedorForm.get('cp').value,
      localidad: this.proveedorForm.get('localidad').value,
      provincia: this.proveedorForm.get('provincia').value,
      telefono: this.proveedorForm.get('telefono').value,
      email: this.proveedorForm.get('email').value,
      contacto: this.proveedorForm.get('contacto').value
    };
    return saveProveedor;
  }
}
