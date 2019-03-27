import { Component, OnInit } from '@angular/core';
import { LoadfileService } from '../../servicios/loadfile.service';


@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {


  public uploads: Array<any> = [];
  pageActual: number = 1;


  numeros: number[] = [1, 5, 10, 15, 20, 50, 100, 200];
  numero: number = 10;

  constructor(private loadfileService: LoadfileService) { }

  public ngOnInit(): void {

    this.loadfileService.getUploads()
      .subscribe( ( response ) => {
        this.uploads = [];
        // tslint:disable-next-line:forin
        for (const id in response) {

          const upload: any = response[id];
          const p: any = upload.payload.val();

          this.uploads.push({
            key: upload.key,
            name: p.name,
            url: p.url
          });
        }
      });

  }
}
