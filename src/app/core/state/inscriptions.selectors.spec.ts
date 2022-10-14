import * as fromInscriptions from './inscriptions.reducer';
import { selectInscriptionsState } from './inscriptions.selectors';

describe('Inscriptions Selectors', () => {
  it('should select the feature state', () => {
    const result = selectInscriptionsState({
      [fromInscriptions.inscriptionsFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
