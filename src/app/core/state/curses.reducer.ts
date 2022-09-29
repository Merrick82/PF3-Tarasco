import { Action, createReducer, on } from '@ngrx/store';
import { Curse } from 'src/app/models/curse';
import * as CursesActions from './curses.actions';

export const cursesFeatureKey = 'curses';

export interface CurseState {
  loading: boolean;
  curses: Curse[];
}

export const initialState: CurseState = {
  loading: false,
  curses: []
};

export const reducer = createReducer(
  initialState,

  on(CursesActions.cargarCurses, (state) => {
    return { ...state, loading: true }
  }),

  on(CursesActions.cursesCargados, (state, { curses }) => {
    return { ...state, loading: false, curses: curses }
  })
);
