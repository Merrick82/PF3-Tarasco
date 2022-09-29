import * as fromCurses from './curses.reducer';
import { selectCursesState } from './curses.selectors';

describe('Curses Selectors', () => {
  it('should select the feature state', () => {
    const result = selectCursesState({
      [fromCurses.cursesFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
