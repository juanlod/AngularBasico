import { PresupuestosService } from './../../servicios/presupuestos.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editpres',
  templateUrl: './editpres.component.html',
  styleUrls: ['./editpres.component.css']
})
export class EditpresComponent implements OnInit {
  presupuestoForm: FormGroup;
  presupuesto: any;
  proveedor: string;
  concepto: string;
  fecha: Date;
  base: any;
  tipo: any;
  iva: any = 0;
  total: any = 0;
  year = new Date();
  id: string;

  constructor(private pform: FormBuilder,
              private presupuestoService: PresupuestosService,
              private router: Router,
              private activatedRouter: ActivatedRoute) {

      this.activatedRouter.params
          .subscribe(parametros => {
              this.id = parametros['id'];
              this.presupuestoService.getPresupuesto(this.id)
                    .subscribe(presupuesto => this.presupuesto = presupuesto);
          });
     }


     ngOnInit() {
      this.presupuestoForm = this.pform.group({
        proveedor: ['', [Validators.required, Validators.nullValidator, Validators.minLength(3), Validators.maxLength(70)]],
        fecha: ['', [Validators.required, Validators.min(this.year.getFullYear()), Validators.maxLength(10)]],
        concepto: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
        base: ['', [Validators.required, Validators.nullValidator, Validators.min(1)]],
        tipo: ['', Validators.required],
        iva: this.iva,
        total: this.total
      });

      this.onChanges();
    }

  onChanges(): void {
    this.presupuestoForm.valueChanges.subscribe(valor => {
      this.base = valor.base;
      this.tipo = valor.tipo;
      this.presupuestoForm.value.iva = this.base * this.tipo;
      this.presupuestoForm.value.total = this.base + (this.base * this.tipo)
    });
  }

  //Se envia la id contenida en firebase
  //Se incluye en la ruta de navegación
  onSubmit() {
    this.presupuesto = this.savePresupuesto();
    this.presupuestoService.putPresupuesto(this.presupuesto, this.id)
      .subscribe(newpres => {
          this.router.navigate(['/presupuestos']);
      });
    this.presupuestoForm.reset();
  }
  savePresupuesto() {
    const savePresupuesto = {
      proveedor: this.presupuestoForm.get('proveedor').value,
      fecha: this.presupuestoForm.get('fecha').value,
      concepto: this.presupuestoForm.get('concepto').value,
      base: this.presupuestoForm.get('base').value,
      tipo: this.presupuestoForm.get('tipo').value,
      iva: this.presupuestoForm.get('iva').value,
      total: this.presupuestoForm.get('total').value
    };
    return savePresupuesto;
  }

}
