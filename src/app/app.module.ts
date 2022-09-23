import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from '../environments/environment';

//modulos
import { AppRoutingModule } from './app.routing.module';

//NgRx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './app.reducer';



//AngularFire
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';


//modulos
import { AuthModule } from './auth/auth.module';






@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AuthModule,

    

    StoreModule.forRoot( appReducers ),
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
