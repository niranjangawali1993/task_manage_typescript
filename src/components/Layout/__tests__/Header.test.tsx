import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom'; //
import { CommonContext } from '../../../contexts';
import Header from '../Header';
import { MemorizedAddTask } from '../../Modals/AddTask';

describe('Header component', () => {
  let updatePopupStatusMock: any,
    popupStatusMock: boolean,
    setEditableTaskMock: any;

  beforeEach(() => {
    updatePopupStatusMock = jest.fn();
    popupStatusMock = false;
    setEditableTaskMock = jest.fn();
  });

  const renderWithCommonContext = (component: any) => (
    <Router>
      <CommonContext.Provider
        value={
          {
            updatePopupStatus: updatePopupStatusMock,
            popupStatus: popupStatusMock,
            setEditableTask: setEditableTaskMock,
          } as any
        }
      >
        {component}
      </CommonContext.Provider>
    </Router>
  );

  it('should render application title correctly', () => {
    render(renderWithCommonContext(<Header />));

    waitFor(() => {
      expect(screen.getByTestId('application-title')).toBeInTheDocument();
    });
  });

  it('should render the logo with correct alt text', () => {
    render(renderWithCommonContext(<Header />));

    const logo = screen.getByAltText('Logo');
    waitFor(() => {
      expect(logo).toBeInTheDocument();
    });
  });

  it('should render the dropdown component correctly', async () => {
    render(renderWithCommonContext(<Header />));

    await waitFor(() => {
      expect(screen.getByTestId('dropdown-component')).toBeInTheDocument();
    });
  });

  it('should render the darkMode component correctly', async () => {
    render(renderWithCommonContext(<Header />));
    await waitFor(() => {
      expect(screen.getByTestId('dark-mode-component')).toBeInTheDocument();
    });
  });

  it('should open add task popup on addTask button click', async () => {
    render(renderWithCommonContext(<Header />));
    popupStatusMock = true;
    await waitFor(async () => {
      const addTaskButton = screen.getByTestId('addTaskPopupButton');
      expect(addTaskButton).toBeInTheDocument();
      fireEvent.click(addTaskButton);
      expect(updatePopupStatusMock).toBeCalled();
      expect(updatePopupStatusMock).toBeCalledWith(true);
      expect(setEditableTaskMock).toBeCalled();
      expect(setEditableTaskMock).toBeCalledWith(null);
    });
  });

  it('should close popup on click close popup', async () => {
    popupStatusMock = true;

    render(renderWithCommonContext(<Header />));

    await waitFor(() => {
      const closeButton = screen.getByTestId(
        'close-modal-button'
      ) as HTMLButtonElement;
      expect(closeButton).toBeInTheDocument();
      fireEvent.click(closeButton);
      expect(updatePopupStatusMock).toHaveBeenCalled();
    });
  });

  /*
  it('should close popup on click close popup', async () => {
    const closeAddTaskPopupMock = () => {
      updatePopupStatusMock(false);
    };

    render(
      <Router>
        <CommonContext.Provider
          value={
            {
              updatePopupStatus: updatePopupStatusMock,
              popupStatus: true,
              setEditableTask: setEditableTaskMock,
            } as any
          }
        >
          <Header />
        </CommonContext.Provider>
      </Router>
    );

    const closeButton = screen.getByTestId(
      'close-modal-button'
    ) as HTMLButtonElement;
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    expect(updatePopupStatusMock).toHaveBeenCalledWith(false);
  });
  */

  it('should handle submenu click', async () => {
    render(renderWithCommonContext(<Header />));
    await waitFor(() => {
      const submenuButton = screen.getByRole('button', {
        name: 'Open sub menu',
      });
      expect(submenuButton).toBeInTheDocument();
      fireEvent.click(submenuButton);
    });
  });
});
