import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import Home from '../index';
import store from '../../../store';

describe('Home page', () => {
  it('Should render Home page without errors', () => {
    const view = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(view.container).not.toBe(null);
  });
});
