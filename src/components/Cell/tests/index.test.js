import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { mockStore } from '@utility/mocks';
import Cell from '../index';

test('Should render Cell component without errors', () => {
  const view = render(
    <Provider store={mockStore()}>
      <Cell data={{}} />
    </Provider>
  );

  expect(view.container).not.toBe(null);
});
