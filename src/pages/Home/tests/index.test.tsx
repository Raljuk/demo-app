import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import Home from '../index';
import { mockStore } from '../../../utility/mocks';

describe('Home page', () => {
  it('Should render Home page without errors', () => {
    const view = render(
      <Provider store={mockStore()}>
        <Home />
      </Provider>
    );

    expect(view.container).not.toBe(null);
  });
});
