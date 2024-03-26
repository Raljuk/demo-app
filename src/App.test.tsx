import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import App from './App';
import store from './store';

test('Should render App component without errors', () => {
  const view = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(view.container).not.toBe(null);
});
