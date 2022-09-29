import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { Curse } from '../../../../models/curse';
import { AddCurseComponent } from '../add-curse/add-curse.component';
import { EditCurseComponent } from '../edit-curse/edit-curse.component';
import { CursesService } from '../../../../services/curses.service'; 
import { CurseState } from 'src/app/core/state/curses.reducer';
import { Store } from '@ngrx/store';
import { cargarCurses, cursesCargados } from 'src/app/core/state/curses.actions';
import { selectCargandoState, selectCursosCargadosState } from 'src/app/core/state/curses.selectors';

@Component({
  selector: 'app-curse-list',
  templateUrl: './curse-list.component.html',
  styleUrls: ['./curse-list.component.css']
})
export class CurseListComponent implements OnInit {
  public columns: string[] = ['curso', 'profesor', 'activo', 'acciones'];
  public curses$!: Observable<Curse[]>;
  public loading$!: Observable<boolean>;
  
  @ViewChild(MatTable) table!: MatTable<Curse>;
  constructor(private dialog: MatDialog, private curseService: CursesService,
    private store: Store<CurseState>
    ) {}

  ngOnInit(): void {
    this.store.dispatch(cargarCurses());
    this.curseService.getCurses().subscribe((cursesFounded) => {
      this.store.dispatch(cursesCargados({
        curses: cursesFounded
      }));
    });

    this.loading$ = this.store.select(selectCargandoState);
    this.curses$ = this.store.select(selectCursosCargadosState);
  }

  public addCurse() {
    const dialogRef = this.dialog.open(AddCurseComponent, {
      width: '500px',
      height: '350px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.curseService.addCurse(res).subscribe((data) => {
          if (data) {
            alert(`${data.id}-${data.title} fue agregado satisfactoriamente`);
            this.ngOnInit();
          }
        });
        
        this.table.renderRows();
      }
    });
  }
  
  public editCurse(curse: Curse) {
    const dialogRef = this.dialog.open(EditCurseComponent, {
      width: '500px',
      height: '350px',
      data: curse
    });
    
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.curseService.editCurse(res).subscribe((data) => {
          if (data) {
            alert(`${data.id}-${data.title} fue modificado satisfactoriamente`);
            this.ngOnInit();
          }
        });
        
        this.table.renderRows();
      }
    });
  }
  
  public deleteCurse(curse: Curse) {
    this.curseService.deleteCurse(curse.id).subscribe((data) => {
      if (data) {
        alert(`${data.id}-${data.title} fue eliminado satisfactoriamente`);
        this.ngOnInit();
      }
    });
  }
}
