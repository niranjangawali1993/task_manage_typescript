import React from 'react';
import { render, act } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';

import App from './App';
import { async } from 'q';
import { ToastContainer } from 'react-toastify';
import AllRoutes from './routes/AllRoutes';

// Mock window.scrollTo
window.scrollTo = jest.fn();

describe('App file test cases ', () => {
  test('renders App component without crashing', async () => {
    await act(async () => {
      render(
        <Router>
          <App />
        </Router>
      );
    });
  });

  test('renders background image correctly', async () => {
    let container: any;
    await act(async () => {
      const rendered = render(
        <Router>
          <App />
        </Router>
      );

      container = rendered.container;
    });

    if (container) {
      const appElement = container.firstChild as HTMLElement;
      expect(appElement).toHaveStyle(
        'background-image: url(raychan-background.jpg);'
      );
    } else {
      // Handle the case when container is not assigned
      throw new Error('Container not found');
    }
  });

  test('renders ToastContainer component', async () => {
    await act(async () => {
      render(
        <Router>
          <ToastContainer />
        </Router>
      );
    });
    expect(document.querySelector('.Toastify')).toBeInTheDocument();
  });

  test('renders AllRoutes component without errors', async () => {
    await act(async () => {
      render(
        <Router>
          <AllRoutes />
        </Router>
      );
    });
  });
});
