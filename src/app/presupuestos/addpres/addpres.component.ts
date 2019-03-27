import { ProveedoresService } from './../../servicios/proveedores.service';
import { PresupuestosService } from './../../servicios/presupuestos.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-addpres',
  templateUrl: './addpres.component.html',
  styleUrls: ['./addpres.component.css']
})
export class AddpresComponent implements OnInit {
  presupuestoForm: FormGroup;
  presupuesto: any;
  proveedor: string;
  concepto: string;
  fecha: any;
  base: number;
  tipo: any;
  iva: any = 0;
  total: any = 0;

  proveedores: any[] = [];

  year = new Date();

  constructor(private pform: FormBuilder,
              private presupuestoService: PresupuestosService,
              private router: Router,
              private proveedoresService: ProveedoresService) {

              this.proveedoresService.getProveedores()
                .subscribe(proveedores => {
                  // tslint:disable-next-line:forin
                  for (const id$ in proveedores) {
                    const p = proveedores[id$];
                    p.id$ = id$;
                    this.proveedores.push(proveedores[id$]);
                  }
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
      this.presupuestoForm.value.total = this.base + (this.base * this.tipo);
    });
  }

  onSubmit() {
    this.presupuesto = this.savePresupuesto();
    this.presupuestoService.postPresupuesto(this.presupuesto)
      .subscribe(newpres => {

      });
    this.presupuestoForm.reset();
    this.router.navigate(['/presupuestos']);
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
