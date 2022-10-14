import { createAction, props } from '@ngrx/store';
import { Inscription } from 'src/app/models/inscription';

export const cargarInscriptions = createAction(
  '[Inscriptions] Cargar Inscriptions'
);

export const inscriptionsCargados = createAction(
  '[Inscriptions] Inscripciones Cargadas',
  props<{ inscriptions: Inscription[] }>()
);
