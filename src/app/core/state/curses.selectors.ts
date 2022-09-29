import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCurses from './curses.reducer';

export const selectCursesState = createFeatureSelector<fromCurses.CurseState>(
  fromCurses.cursesFeatureKey
);

export const selectCargandoState = createSelector(
  selectCursesState,
  (state: fromCurses.CurseState) => state.loading
);

export const selectCursosCargadosState = createSelector(
  selectCursesState,
  (state: fromCurses.CurseState) => state.curses
);