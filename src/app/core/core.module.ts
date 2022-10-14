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
import * as fromInscriptions from './state/inscriptions.reducer';
import { InscriptionListComponent } from './components/inscriptions/inscription-list/inscription-list.component';
import { AddInscriptionComponent } from './components/inscriptions/add-inscription/add-inscription.component';
import { EditInscriptionComponent } from './components/inscriptions/edit-inscription/edit-inscription.component';

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
    EditCurseComponent,
    InscriptionListComponent,
    AddInscriptionComponent,
    EditInscriptionComponent
  ],
  imports: [
    CoreRoutingModule,
    SharedModule,
    StoreModule.forFeature(fromCurses.cursesFeatureKey, fromCurses.reducer),
    StoreModule.forFeature(fromStudents.studentsFeatureKey, fromStudents.reducer),
    StoreModule.forFeature(fromInscriptions.inscriptionsFeatureKey, fromInscriptions.reducer)
  ],
  providers: [
    StudentsService,
    CursesService,
    AuthGuard
  ]
})
export class CoreModule { }
