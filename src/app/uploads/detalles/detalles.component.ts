import { LoadfileService } from './../../servicios/loadfile.service';
import { Archivo } from './../file.modal';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  @Input() upload: Archivo;

  constructor(private loadfileService: LoadfileService) { }

  ngOnInit() {
  }

  //método para eliminar archivos
  delete(upload: Archivo) {
    this.loadfileService.delete(this.upload);
  }
}
