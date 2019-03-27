import { LoadfileService } from './../../servicios/loadfile.service';
import { Archivo } from './../file.modal';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  selectedFiles: FileList;
  currentUpload: Archivo;

  loading = false;

  constructor(public loadfileService: LoadfileService) { }

  ngOnInit() {
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  //carga un solo archivo
  uploadSingle() {
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Archivo(file);
    this.loading = true;
    this.loadfileService.pushUpload(this.currentUpload);
  }


}
