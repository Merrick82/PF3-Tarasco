import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guard/auth.guard';
import { CurseListComponent } from './components/curses/curse-list/curse-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InitComponent } from './components/init/init.component';
import { StudentListComponent } from './components/students/student-list/student-list.component';
import { UnderConstructComponent } from './components/under-construct/under-construct.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, 
    children: [
      { path: 'inicio', component: InitComponent },
      { path: 'curses-list', canActivate: [AuthGuard], component: CurseListComponent },
      { path: 'students-list', canActivate: [AuthGuard], component: StudentListComponent },
      { path: 'under-construct', component: UnderConstructComponent }
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
