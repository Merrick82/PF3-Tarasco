import { createAction, props } from '@ngrx/store';
import { Student } from 'src/app/models/student';

export const cargarStudents = createAction(
  '[Students] Cargar Students'
);

export const studentsCargados = createAction(
  '[Students] Estudiantes Cargados',
  props<{ students: Student[] }>()
);



