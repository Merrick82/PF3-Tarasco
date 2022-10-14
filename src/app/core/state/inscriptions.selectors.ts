import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscriptions from './inscriptions.reducer';

export const selectInscriptionsState = createFeatureSelector<fromInscriptions.InscriptionState>(
  fromInscriptions.inscriptionsFeatureKey
);

export const selectCargandoState = createSelector(
  selectInscriptionsState,
  (state: fromInscriptions.InscriptionState) => state.loading
);

export const selectInscripcionesCargadosState = createSelector(
  selectInscriptionsState,
  (state: fromInscriptions.InscriptionState) => state.inscriptions
);