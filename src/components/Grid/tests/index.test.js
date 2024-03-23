import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { mockStore } from '../../../utility/mocks';
import Grid from '../index';
import { LeveSizes } from '../../../reducers/levels/types';
import { generateGrid } from '../../../utility/grid';

test('Should render Grid component without errors', () => {
  const view = render(
    <Provider store={mockStore()}>
      <Grid data={generateGrid(LeveSizes.first, LeveSizes.first)} />
    </Provider>
  );

  expect(view.container).not.toBe(null);
});
