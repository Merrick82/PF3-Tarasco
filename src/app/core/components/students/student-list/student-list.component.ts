import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Student } from 'src/app/models/student';
import { AddStudentComponent } from '../add-student/add-student.component';
import { EditStudentComponent } from '../edit-student/edit-student.component';
import { StudentsService } from '../../../../services/students.service';
import { StudentState } from 'src/app/core/state/students.reducer';
import { Store } from '@ngrx/store';
import { cargarStudents, studentsCargados } from 'src/app/core/state/students.actions';
import { selectCargandoState, selectEstudiantesCargadosState } from 'src/app/core/state/students.selectors';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  public columns: string[] = ['nombre', 'promedio', 'cursando', 'acciones'];
  public students$!: Observable<Student[]>;
  public loading$!: Observable<boolean>;

  @ViewChild(MatTable) table!: MatTable<Student>;
  constructor(private dialog: MatDialog, private studentService: StudentsService,
    private store: Store<StudentState>) { }
    
  ngOnInit(): void {
    this.store.dispatch(cargarStudents());
    this.studentService.getStudents().subscribe((studentsFounded) => {
      this.store.dispatch(studentsCargados({
        students: studentsFounded
      }));
    });

    this.loading$ = this.store.select(selectCargandoState);
    this.students$ = this.store.select(selectEstudiantesCargadosState);
    
    //this.students$ = this.studentService.getStudents();
  }

  public addStudent() {
    const dialogRef = this.dialog.open(AddStudentComponent, {
      width: '500px',
      height: '350px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.studentService.addStudent(res).subscribe((data) => {
          if (data) {
            alert(`${data.id}-${data.name} ${data.lastname} fue agregado satisfactoriamente`);
            this.ngOnInit();
          }
        });
        
        this.table.renderRows();
      }
    });
  }
  
  public editStudent(student: Student) {
    const dialogRef = this.dialog.open(EditStudentComponent, {
      width: '500px',
      height: '350px',
      data: student
    });
    
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.studentService.editStudent(res).subscribe((data) => {
          if (data) {
            alert(`${data.id}-${data.name} ${data.lastname} fue modificado satisfactoriamente`);
            this.ngOnInit();
          }
        });
        
        this.table.renderRows();
      }
    });
  }
  
  public deleteStudent(student: Student) {
    this.studentService.deleteStudent(student.id).subscribe((data) => {
      if (data) {
        alert(`${data.id}-${data.name} ${data.lastname} fue eliminado satisfactoriamente`);
        this.ngOnInit();
      }
    });
  }
}
