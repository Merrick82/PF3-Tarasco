import { Action, createReducer, on } from '@ngrx/store';
import { Inscription } from 'src/app/models/inscription';
import * as InscriptionsActions from './inscriptions.actions';

export const inscriptionsFeatureKey = 'inscriptions';

export interface InscriptionState {
  loading: boolean;
  inscriptions: Inscription[];
}

export const initialState: InscriptionState = {
  loading: false,
  inscriptions: []
};

export const reducer = createReducer(
  initialState,

  on(InscriptionsActions.cargarInscriptions, (state) => {
    return { ...state, loading: true }
  }),

  on(InscriptionsActions.inscriptionsCargados, (state, { inscriptions }) => {
    return { ...state, loading: false, inscriptions: inscriptions }
  })
);
