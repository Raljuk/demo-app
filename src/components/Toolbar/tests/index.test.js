import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { mockStore } from '@utility/mocks';
import Toolbar from '../index';

test('Should render Toolbar component without errors', () => {
  const view = render(
    <Provider store={mockStore()}>
      <Toolbar />
    </Provider>
  );

  expect(view.container).not.toBe(null);
});
