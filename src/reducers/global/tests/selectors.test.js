import { getMode } from '../selectors';

describe('Global selectors', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(getMode).not.toThrow();
  });
});
