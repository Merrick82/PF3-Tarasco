import { Action, createReducer, on } from '@ngrx/store';
import { Student } from 'src/app/models/student';
import * as StudentsActions from './students.actions';

export const studentsFeatureKey = 'students';

export interface StudentState {
  loading: boolean;
  students: Student[];
}

export const initialState: StudentState = {
  loading: false,
  students: []
};

export const reducer = createReducer(
  initialState,

  on(StudentsActions.cargarStudents, (state) => {
    return { ...state, loading: true }
  }),

  on(StudentsActions.studentsCargados, (state, { students }) => {
    return { ...state, loading: false, students: students }
  })
);
