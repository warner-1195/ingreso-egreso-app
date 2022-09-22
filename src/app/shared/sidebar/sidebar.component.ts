import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Usuario } from 'src/app/models/usuario.model';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombre: string  = '';
  userSubs!: Subscription

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit(): void {

    this.userSubs = this.store.select('user')
                        .subscribe( ({user}) => this.nombre = user?.nombre);
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  logOut(){

  
    this.authService.logout();
    this.router.navigate(['/login'])
     
  }

  
}
