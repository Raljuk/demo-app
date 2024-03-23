import { setMode } from '../actions';

describe('Global actions', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(setMode).not.toThrow();
  });
});
