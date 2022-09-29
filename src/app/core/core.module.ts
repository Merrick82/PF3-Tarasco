import { NgModule } from '@angular/core';

import { CoreRoutingModule } from './core-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InitComponent } from './components/init/init.component';
import { UnderConstructComponent } from './components/under-construct/under-construct.component';
import { StudentListComponent } from './components/students/student-list/student-list.component';
import { AddStudentComponent } from './components/students/add-student/add-student.component';
import { EditStudentComponent } from './components/students/edit-student/edit-student.component';
import { CurseListComponent } from './components/curses/curse-list/curse-list.component';
import { AddCurseComponent } from './components/curses/add-curse/add-curse.component';
import { EditCurseComponent } from './components/curses/edit-curse/edit-curse.component';
import { SharedModule } from '../shared/shared.module';
import { StudentsService } from '../services/students.service';
import { CursesService } from '../services/curses.service';
import { AuthGuard } from '../shared/guard/auth.guard';
import { StoreModule } from '@ngrx/store';
import * as fromCurses from './state/curses.reducer';
import * as fromStudents from './state/students.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    InitComponent,
    UnderConstructComponent,
    StudentListComponent,
    AddStudentComponent,
    EditStudentComponent,
    CurseListComponent,
    AddCurseComponent,
    EditCurseComponent
  ],
  imports: [
    CoreRoutingModule,
    SharedModule,
    StoreModule.forFeature(fromCurses.cursesFeatureKey, fromCurses.reducer),
    StoreModule.forFeature(fromStudents.studentsFeatureKey, fromStudents.reducer)
  ],
  providers: [
    StudentsService,
    CursesService,
    AuthGuard
  ]
})
export class CoreModule { }
