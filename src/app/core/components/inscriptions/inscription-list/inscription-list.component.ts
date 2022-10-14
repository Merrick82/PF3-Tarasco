import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { cargarInscriptions, inscriptionsCargados } from 'src/app/core/state/inscriptions.actions';
import { InscriptionState } from 'src/app/core/state/inscriptions.reducer';
import { selectCargandoState, selectInscripcionesCargadosState } from 'src/app/core/state/inscriptions.selectors';
import { Inscription } from 'src/app/models/inscription';
import { InscriptionsService } from 'src/app/services/inscriptions.service';
import { AddInscriptionComponent } from '../add-inscription/add-inscription.component';
import { EditInscriptionComponent } from '../edit-inscription/edit-inscription.component';

@Component({
  selector: 'app-inscription-list',
  templateUrl: './inscription-list.component.html',
  styleUrls: ['./inscription-list.component.css']
})
export class InscriptionListComponent implements OnInit {
  public columns: string[] = ['id', 'curso', 'estudiante', 'acciones'];
  public inscriptions$!: Observable<Inscription[]>;
  public loading$!: Observable<boolean>;

  @ViewChild(MatTable) table!: MatTable<Inscription>;
  constructor(private dialog: MatDialog, private inscriptionService: InscriptionsService,
    private store: Store<InscriptionState>) { }
    
  ngOnInit(): void {
    this.store.dispatch(cargarInscriptions());
    this.inscriptionService.getInscriptions().subscribe((inscriptionsFounded) => {
      this.store.dispatch(inscriptionsCargados({
        inscriptions: inscriptionsFounded
      }));
    });

    this.loading$ = this.store.select(selectCargandoState);
    this.inscriptions$ = this.store.select(selectInscripcionesCargadosState);
  }

  public addInscription() {
    const dialogRef = this.dialog.open(AddInscriptionComponent, {
      width: '500px',
      height: '350px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.inscriptionService.addInscription(res).subscribe((data) => {
          if (data) {
            alert(`${data.id}-${data.curse} ${data.student} fue agregado satisfactoriamente`);
            this.ngOnInit();
          }
        });
        
        this.table.renderRows();
      }
    });
  }
  
  public editInscription(inscription: Inscription) {
    const dialogRef = this.dialog.open(EditInscriptionComponent, {
      width: '500px',
      height: '350px',
      data: inscription
    });
    
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.inscriptionService.editInscription(res).subscribe((data) => {
          if (data) {
            alert(`${data.id}-${data.curse} ${data.student} fue modificado satisfactoriamente`);
            this.ngOnInit();
          }
        });
        
        this.table.renderRows();
      }
    });
  }
  
  public deleteInscription(inscription: Inscription) {
    this.inscriptionService.deleteInscription(inscription.id).subscribe((data) => {
      if (data) {
        alert(`${data.id}-${data.curse} ${data.student} fue eliminado satisfactoriamente`);
        this.ngOnInit();
      }
    });
  }
}
