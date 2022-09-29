import { createAction, props } from '@ngrx/store';
import { Curse } from 'src/app/models/curse';

export const cargarCurses = createAction(
  '[Curses] Cargar Curses'
);

export const cursesCargados = createAction(
  '[Curses] Cursos Cargados',
  props<{ curses: Curse[] }>()
);




