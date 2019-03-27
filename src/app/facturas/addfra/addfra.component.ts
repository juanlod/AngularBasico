import { FacturasService } from './../../servicios/facturas.service';
import { ProveedoresService } from './../../servicios/proveedores.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addfra',
  templateUrl: './addfra.component.html',
  styleUrls: ['./addfra.component.css']
})
export class AddfraComponent implements OnInit {

  facturaForm: FormGroup;
  factura: any;
  proveedor: string;
  concepto: string;
  fecha: any;
  base: any;
  tipo: any;
  iva: any = 0;
  total: any = 0;
  hoy = 10;

  year = new Date();

  
  proveedores: any[] = [];

  constructor(private pf: FormBuilder,
              private facturaService: FacturasService,
              private router: Router,
              private proveedoresService: ProveedoresService) {


      //método que carga los proveedores en combobox
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
  
    this.facturaForm = this.pf.group({
      proveedor: ['', [Validators.required, Validators.nullValidator, Validators.minLength(3), Validators.maxLength(70)]],
      fecha: ['', [Validators.required, Validators.min(this.year.getFullYear()), Validators.max(this.year.getFullYear())]],
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
    this.facturaService.postFactura(this.factura)
      .subscribe(newfact => {
      });
    this.facturaForm.reset();
    this.router.navigate(['/facturas']);
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
