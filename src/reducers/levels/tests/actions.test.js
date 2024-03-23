import { addLevel } from '../actions';

describe('Levels actions', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(addLevel).not.toThrow();
  });
});
