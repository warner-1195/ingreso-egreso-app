import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateWhitIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[] = [];
  ingresosSubs!: Subscription

  constructor(private store: Store<AppStateWhitIngreso>,
              private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {

    this.ingresosSubs = this.store.select('ingresosEgresos')
        .subscribe( ({items}) => (this.ingresosEgresos = [...items]));
  }

  ngOnDestroy() {
   this.ingresosSubs.unsubscribe()
  }

  borrar(uid : string | any){
    this.ingresoEgresoService.borrarIngresoEgreso(uid)
        .then( () => Swal.fire('Borrado','Item borrado','success'))
        .catch( err => Swal.fire('Error',err.message , 'error'))

  }

}
