import { FacturasService } from './../../servicios/facturas.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-editfra',
  templateUrl: './editfra.component.html',
  styleUrls: ['./editfra.component.css']
})
export class EditfraComponent implements OnInit {

  facturaForm: FormGroup;
  factura: any;
  proveedor: string;
  concepto: string;
  fecha: any;
  base: any;
  tipo: any;
  iva: any = 0;
  total: any = 0;

  id: string;

  year = new Date();

  constructor(private facturaf: FormBuilder,
              private facturaService: FacturasService,
              private router: Router,
              private activatedRouter: ActivatedRoute) {

      this.activatedRouter.params
          .subscribe(parametros => {
              this.id = parametros['id'];
              this.facturaService.getFactura(this.id)
                  .subscribe(factura => this.factura = factura);
          });
               }

ngOnInit() {
  this.facturaForm = this.facturaf.group({
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
    this.facturaForm.valueChanges.subscribe(valor => {
      this.base = valor.base;
      this.tipo = valor.tipo;
      this.facturaForm.value.iva = this.base * this.tipo;
      this.facturaForm.value.total = this.base + (this.base * this.tipo);
    });
  }

  onSubmit() {
    this.factura = this.saveFactura();
    this.facturaService.putFactura(this.factura, this.id)
      .subscribe(newfact => {
        this.router.navigate(['/facturas']);
      });
    this.facturaForm.reset();
  }

  saveFactura() {
    const saveFactura = {
      proveedor: this.facturaForm.get('proveedor').value,
      fecha: this.facturaForm.get('fecha').value,
      concepto: this.facturaForm.get('concepto').value,
      base: this.facturaForm.get('base').value,
      tipo: this.facturaForm.get('tipo').value,
      iva: this.facturaForm.get('iva').value,
      total: this.facturaForm.get('total').value,
    };
    return saveFactura;
  }

}
