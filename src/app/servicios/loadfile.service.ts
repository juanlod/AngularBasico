import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FireBaseListObservable, FirebaseObjectObservable } from 'firebase/database';
import * as firebase from 'firebase';
import { Archivo } from '../uploads/file.modal';


@Injectable({
  providedIn: 'root'
})
export class LoadfileService {

  private basePath: string = '/uploads';

  uploads: FireBaseListObservable<Archivo[]>;

  constructor(public angularFireDatabase: AngularFireDatabase) {

  }

  //método para subir archivos
  pushUpload(upload: Archivo) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    //este método sirve para conectarse a la base de datos de Firebase
    //crea una carpeta uploads a donde se van a subir los archivos
    //y crear una colección para almacenar los metadatos
    // para poder recuperarlos
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes * 100);
      },
      (error) => {
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          upload.url = downloadURL;
          upload.name = upload.file.name;
          delete upload.progress;
          this.saveFileData(upload);
        });
      });
  }

  private saveFileData(upload: Archivo) {
    this.angularFireDatabase.list(`${this.basePath}/`).push(upload);
  }


  getUploads(): any {
    //clase del paquete de angular para la conexion con firebase
    //se le añade la ruta del archivo para poder acceder a el,
    //y recoge todos los archivos de la base de datos

    return this.angularFireDatabase.list<Archivo>(this.basePath).snapshotChanges();
  }


  public delete(upload: Archivo): void {
    this.deleteFileData(upload.key)
      .then(() => {
        this.deleteFileStorage(upload.name);
      })
      .catch(error => console.log(error));
  }

//metodo que elimina los metadatos de cada archivo
  private deleteFileData(key: string): any {
      return this.angularFireDatabase.list(`${this.basePath}/`).remove(key);

  }

  //elimina el archivo del storage
  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }

}
