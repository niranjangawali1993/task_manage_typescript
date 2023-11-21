import { MemoryRouter as Router, useLocation } from 'react-router-dom';
import ScrollToTop from '../ScrollToTop';
import { render } from '@testing-library/react';

describe('ScrollToTop test suite', () => {
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(),
  }));

  global.scrollTo = jest.fn();

  it('should render correctly ', () => {
    render(
      <Router>
        <ScrollToTop />
      </Router>
    );
  });

  it('should scroll to the top when pathname changes', () => {
    render(
      <Router>
        <ScrollToTop />
      </Router>
    );
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
