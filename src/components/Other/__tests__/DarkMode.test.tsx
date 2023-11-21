import { MemoryRouter as Router } from 'react-router-dom';
import { CommonContext } from '../../../contexts';
import { fireEvent, render, screen } from '@testing-library/react';
import DarkMode from '../DarkMode';

describe('DarkMode test suite', () => {
  let darkModeMock: boolean = false,
    setDarkModeMock: any;
  beforeEach(() => {
    darkModeMock = false;
    setDarkModeMock = jest.fn();
  });
  const renderWithCommonContext = (component: any) => (
    <Router>
      <CommonContext.Provider
        value={
          {
            darkMode: darkModeMock,
            setDarkMode: setDarkModeMock,
          } as any
        }
      >
        {component}
      </CommonContext.Provider>
    </Router>
  );

  it('should render correctly', () => {
    render(renderWithCommonContext(<DarkMode />));
  });

  it('should contain option to enable the dark mode', () => {
    render(renderWithCommonContext(<DarkMode />));
    const enableDarkModeBtn = screen.getByTestId('enable-dark-mode');
    expect(enableDarkModeBtn).toBeInTheDocument();
    fireEvent.click(enableDarkModeBtn);
  });

  it('should contain option to disable the dark mode', () => {
    darkModeMock = true;
    render(renderWithCommonContext(<DarkMode />));
    const disableDarkModeBtn = screen.getByTestId('disable-dark-mode');
    expect(disableDarkModeBtn).toBeInTheDocument();
    fireEvent.click(disableDarkModeBtn);
  });
});
