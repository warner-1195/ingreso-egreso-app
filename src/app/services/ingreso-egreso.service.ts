import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private fireStore: AngularFirestore,
              private authService: AuthService) { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso){
    const uid = this.authService.user?.uid;

    delete ingresoEgreso.uid;
    return this.fireStore.doc(`${uid}/ingresos-egresos`)
          .collection('items')
          .add({...ingresoEgreso})


  }

  initIngresosEgresosListener(uid: string){

    return this.fireStore.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map( snapshot =>  snapshot.map(doc =>({
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data() as any,
            
              
              
              
              
            })

          )
        )
      );
  }

  borrarIngresoEgreso(uidItem: string){
    const uid = this.authService.user?.uid;
    return this.fireStore.doc<AngularFirestore>(`${uid}/ingresos-egresos/items/${uidItem}`).delete();

  }

}
