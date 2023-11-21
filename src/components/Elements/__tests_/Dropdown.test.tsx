import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Dropdown from '../Dropdown';
import { MemoryRouter as Router } from 'react-router-dom';

import { TaskContext, UserContext } from '../../../contexts';
import { ErrorHandler, UserData } from '../../../utility';
import { act } from 'react-dom/test-utils';
import { toast } from 'react-toastify';

describe('Dropdown component test suite', () => {
  let mockGetUserDetails: any,
    initialState: UserData,
    logoutMock: any,
    setTaskListMock: any;
  beforeAll(() => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: jest.fn(),
    }));
    sessionStorage.setItem('userId', JSON.stringify('user-id'));
  });

  beforeEach(() => {
    mockGetUserDetails = jest.fn().mockResolvedValue({
      id: 'user-id',
      name: 'John',
      email: 'john@gmail.com',
    });

    initialState = {
      accessToken: 'access-token',
      user: {
        id: 'user-id',
        name: 'John',
        email: 'john@gmail.com',
      },
    };

    logoutMock = jest.fn();

    setTaskListMock = jest.fn();
  });

  const renderWithUserContext = (component: any) => (
    <Router>
      <UserContext.Provider
        value={
          {
            getUserDetails: mockGetUserDetails,
            userData: initialState,
            logout: logoutMock,
          } as any
        }
      >
        {component}
      </UserContext.Provider>
    </Router>
  );

  const renderWithUserContextAndTaskContext = (component: any) => (
    <Router>
      <UserContext.Provider
        value={
          {
            getUserDetails: mockGetUserDetails,
            userData: initialState,
            logout: logoutMock,
          } as any
        }
      >
        <TaskContext.Provider value={{ setTaskList: setTaskListMock } as any}>
          {component}
        </TaskContext.Provider>
      </UserContext.Provider>
    </Router>
  );

  it('should render successfully', async () => {
    await act(async () => {
      render(renderWithUserContext(<Dropdown />));
    });
    const userMenuButton = await screen.findByTestId('user-menu-button');
    expect(userMenuButton).toBeInTheDocument();
  });

  it('should fetch user details', async () => {
    await act(async () => {
      render(renderWithUserContext(<Dropdown />));
    });

    await waitFor(() => {
      expect(mockGetUserDetails).toHaveBeenCalled();
      expect(mockGetUserDetails).toHaveBeenCalledWith('user-id');
    });
  });

  it('should fetch user details and handle errors', async () => {
    const userId = 'user-id';
    const errorMessage = 'An error occurred';
    mockGetUserDetails.mockRejectedValue(new Error(errorMessage));

    await act(async () => {
      render(renderWithUserContext(<Dropdown />));
    });

    const toastErrorMock = jest.spyOn(toast, 'error');

    ErrorHandler(new Error(errorMessage));

    await waitFor(() => {
      expect(mockGetUserDetails).toHaveBeenCalled();
      expect(mockGetUserDetails).toHaveBeenCalledWith(userId);
      expect(toastErrorMock).toHaveBeenCalledWith(errorMessage);
    });
  });

  it('should show the menu options on click on user profile', async () => {
    await act(async () => {
      render(renderWithUserContext(<Dropdown />));
    });
    const userMenuButton = await screen.findByTestId('user-menu-button');
    fireEvent.click(userMenuButton);

    expect(screen.getByTestId('logged-in-user-name')).toBeInTheDocument();
    expect(screen.getByTestId('logged-in-user-email')).toBeInTheDocument();
    expect(screen.getByTestId('user-language-change-menu')).toBeInTheDocument();
    expect(screen.getByTestId('user-setting')).toBeInTheDocument();
    expect(screen.getByTestId('user-logout-button')).toBeInTheDocument();
  });

  it('should navigate to user profile when click on user settings', async () => {
    await act(async () => {
      render(renderWithUserContext(<Dropdown />));
    });
    const userMenuButton = await screen.findByTestId('user-menu-button');
    fireEvent.click(userMenuButton);

    const userSettingButton = await screen.findByTestId('user-setting');
    fireEvent.click(userSettingButton);

    // const mockNavigate = jest.fn();

    // jest.mock('react-router-dom', () => ({
    //   navigate: mockNavigate,
    // }));

    // expect(mockNavigate).toHaveBeenCalled();
  });

  it('should click change language to english on click on the change language button', async () => {
    await act(async () => {
      render(renderWithUserContext(<Dropdown />));
    });
    const userMenuButton = await screen.findByTestId('user-menu-button');
    fireEvent.click(userMenuButton);

    const languageChangeButton = await screen.findByTestId(
      'user-language-change-menu'
    );
    expect(languageChangeButton).toBeInTheDocument();

    fireEvent.click(languageChangeButton);

    const changesEnglishLanguageButton = await screen.findByTestId(
      'english-language-option'
    );
    expect(changesEnglishLanguageButton).toBeInTheDocument();
    fireEvent.click(changesEnglishLanguageButton);
  });

  it('should click change language to spanish on click on the change language button', async () => {
    await act(async () => {
      render(renderWithUserContext(<Dropdown />));
    });
    const userMenuButton = await screen.findByTestId('user-menu-button');
    fireEvent.click(userMenuButton);

    const languageChangeButton = await screen.findByTestId(
      'user-language-change-menu'
    );
    expect(languageChangeButton).toBeInTheDocument();

    fireEvent.click(languageChangeButton);

    const changesSpanishLanguageButton = await screen.findByTestId(
      'spanish-language-option'
    );
    expect(changesSpanishLanguageButton).toBeInTheDocument();
    fireEvent.click(changesSpanishLanguageButton);
  });

  it('should show the confirm logout popup, when clicked on the logout button', async () => {
    await act(async () => {
      render(renderWithUserContextAndTaskContext(<Dropdown />));
    });
    const logoutButton = await screen.findByTestId('user-logout-button');
    fireEvent.click(logoutButton);
    const popupModal = screen.getByTestId('popup-modal');
    expect(popupModal).toBeInTheDocument();

    const confirmButton = screen.getByRole('button', {
      name: 'positiveResponseConfirmPopup',
    });

    fireEvent.click(confirmButton);
    expect(logoutMock).toHaveBeenCalled();
    expect(setTaskListMock).toHaveBeenCalled();
    expect(setTaskListMock).toHaveBeenCalledWith([]);
  });
});
