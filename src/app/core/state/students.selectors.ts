import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStudents from './students.reducer';

export const selectStudentsState = createFeatureSelector<fromStudents.StudentState>(
  fromStudents.studentsFeatureKey
);

export const selectCargandoState = createSelector(
  selectStudentsState,
  (state: fromStudents.StudentState) => state.loading
);

export const selectEstudiantesCargadosState = createSelector(
  selectStudentsState,
  (state: fromStudents.StudentState) => state.students
);
