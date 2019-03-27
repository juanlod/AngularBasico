import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyD8bdRTmmoCuVVBUYvN3yPUVIJOVSiJ6Jk',
      authDomain: 'comprasapp-b36b0.firebaseapp.com',
      databaseURL: 'https://comprasapp-b36b0.firebaseio.com',
      projectId: 'comprasapp-b36b0',
      storageBucket: 'comprasapp-b36b0.appspot.com',
      messagingSenderId: '299258339710'
    });
  }
}
