import { EditproveComponent } from './proveedores/editprove/editprove.component';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule } from 'angularfire2/firestore';
import { DetallesComponent } from './uploads/detalles/detalles.component';
import { ContratosComponent } from './uploads/contratos/contratos.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InisesComponent } from './autenticacion/inises/inises.component';
import { RegistroComponent } from './autenticacion/registro/registro.component';
import { environment } from './config/firebase.config';
import { AddfraComponent } from './facturas/addfra/addfra.component';
import { EditfraComponent } from './facturas/editfra/editfra.component';
import { FacturasModule } from './facturas/facturas.module';
import { FacturasComponent } from './facturas/facturas/facturas.component';
import { HeaderComponent } from './header/header.component';
import { InicioComponent } from './inicio/inicio.component';
import { AddpresComponent } from './presupuestos/addpres/addpres.component';
import { EditpresComponent } from './presupuestos/editpres/editpres.component';
import { PresupuestosComponent } from './presupuestos/presupuestos/presupuestos.component';
import { AddproveComponent } from './proveedores/addprove/addprove.component';
import { ProveedoresComponent } from './proveedores/proveedores/proveedores.component';
import { AutenticacionService } from './servicios/autenticacion.service';
import { FacturasService } from './servicios/facturas.service';
import { GuardService } from './servicios/guard.service';
import { LoadfileService } from './servicios/loadfile.service';
import { PresupuestosService } from './servicios/presupuestos.service';
import { ProveedoresService } from './servicios/proveedores.service';
import { UploadComponent } from './uploads/upload/upload.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSortModule } from '@angular/material/sort';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'proveedores', component: ProveedoresComponent,
    canActivate: [GuardService] },
  { path: 'addprove', component: AddproveComponent,
  canActivate: [GuardService] },
  { path: 'editprove/:id', component: EditproveComponent,
  canActivate: [GuardService] },
  { path: 'addpres', component: AddpresComponent,
  canActivate: [GuardService] },
  { path: 'presupuestos', component: PresupuestosComponent,
  canActivate: [GuardService] },
  { path: 'editpres/:id', component: EditpresComponent,
  canActivate: [GuardService] },
  { path: 'editfra/:id', component: EditfraComponent,
  canActivate: [GuardService] },
  { path: 'registro', component: RegistroComponent },
  { path: 'facturas', component: FacturasComponent,
  canActivate: [GuardService]},
  { path: 'addfra', component: AddfraComponent,
  canActivate: [GuardService]},
  { path: 'editfra/:id', component: EditfraComponent,
  canActivate: [GuardService]},
  { path: 'uploads', component: UploadComponent,
  canActivate: [GuardService]},
  { path: 'contratos', component: ContratosComponent,
  canActivate: [GuardService]},
  { path: 'iniciosesion', component: InisesComponent },
  { path: '**', component: InicioComponent }
];

@NgModule({
   declarations: [
      AppComponent,
      ProveedoresComponent,
      InicioComponent,
      HeaderComponent,
      AddproveComponent,
      AddpresComponent,
      PresupuestosComponent,
      EditpresComponent,
      RegistroComponent,
      InisesComponent,
      FacturasComponent,
      AddfraComponent,
      EditfraComponent,
      UploadComponent,
      ContratosComponent,
      DetallesComponent,
      EditproveComponent

   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      RouterModule.forRoot(routes),
      FormsModule,
      ReactiveFormsModule,
      HttpModule,
      HttpClientModule,
      FacturasModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireDatabaseModule,
      AngularFireAuthModule,
      AngularFireModule,
      AngularFirestoreModule,
      NgxPaginationModule,
      MatSortModule,
      BrowserAnimationsModule,
      NoopAnimationsModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatFormFieldModule,
      MatInputModule
   ],
    exports: [
  
      MatDatepickerModule,
      MatNativeDateModule,
      MatFormFieldModule,
      MatInputModule
   ],
   providers: [
      ProveedoresService,
      PresupuestosService,
      AutenticacionService,
      GuardService,
      FacturasService,
      LoadfileService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
