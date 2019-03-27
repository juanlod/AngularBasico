import { Router, ActivatedRoute } from '@angular/router';
import { AutenticacionService } from './../servicios/autenticacion.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private autenticacionService: AutenticacionService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  isAuth() {
    return this.autenticacionService.isAuthenticated();
  }

  onLogout() {
    this.autenticacionService.logout();
    this.router.navigate(['/inicio']);

  }
}
