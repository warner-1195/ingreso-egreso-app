import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm!: FormGroup;
  loading: boolean = false;
  uiSubscription!: Subscription;

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private store :Store<AppState>,
               private router: Router) { }

  ngOnInit() {

    this.registroForm = this.fb.group({
      nombre:   ['', Validators.required ],
      email:   ['', [Validators.required, Validators.email ] ],
      password: ['', Validators.required ],
    });

    this.uiSubscription = this.store.select('ui').
    subscribe( ui => {
      this.loading = ui.isLoading;
    })

  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
}

  crearUsuario() {

    if ( this.registroForm.invalid ) { return; }

    this.store.dispatch( ui.isLoading() );

    const { nombre, email, password } = this.registroForm.value;

    this.authService.crearUsuario( nombre, email, password )
      .then( credenciales => {
        console.log(credenciales);
        //Swal.close();
        this.store.dispatch( ui.stopLoading() );
        this.router.navigate(['/']);
      })
      .catch( err => {
        this.store.dispatch( ui.stopLoading() );
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      });
  }

}