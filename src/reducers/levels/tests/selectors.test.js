import { getLevels } from '../selectors';

describe('Levels selectors', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(getLevels).not.toThrow();
  });
});
