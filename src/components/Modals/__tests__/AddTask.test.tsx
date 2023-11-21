import { MemoryRouter as Router } from 'react-router-dom';
import { CommonContext, TaskContext } from '../../../contexts';
import AddTask, { MemorizedAddTask } from '../AddTask';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import Header from '../../Layout/Header';
import { unmountComponentAtNode } from 'react-dom';
import { useEffect, useRef } from 'react';

describe('Add Task Modal Test suite', () => {
  let createTaskMock: any, editTaskMock: any;
  let showToasterMock: any, editableTaskMock: any, setShowSpinnerMock: any;
  let isOpenMock: boolean, closeModalMock: any;

  beforeEach(() => {
    createTaskMock = jest.fn();
    editTaskMock = jest.fn();
    showToasterMock = jest.fn();
    editableTaskMock = {
      title: 'Mock Task Title',
      description: 'Mock Task Description',
      id: 'mock-task-id',
      createdAt: new Date().toISOString(),
    };
    setShowSpinnerMock = jest.fn();
    isOpenMock = true;
    closeModalMock = jest.fn();
  });

  // global.addEventListener = jest.fn();
  // global.removeEventListener = jest.fn();

  const renderWithCommonAndTaskContext = (component: any) => (
    <Router>
      <TaskContext.Provider
        value={{ createTask: createTaskMock, editTask: editTaskMock } as any}
      >
        <CommonContext.Provider
          value={
            {
              showToaster: showToasterMock,
              editableTask: editableTaskMock,
              setShowSpinner: setShowSpinnerMock,
            } as any
          }
        >
          {component}
        </CommonContext.Provider>
      </TaskContext.Provider>
    </Router>
  );

  it('should render correctly', () => {
    render(
      renderWithCommonAndTaskContext(
        <AddTask isOpen={isOpenMock} closeModal={closeModalMock} />
      )
    );
    expect(screen.getByTestId('AddTaskModal')).toBeInTheDocument();
  });

  it('should handle edit task form action', async () => {
    render(
      renderWithCommonAndTaskContext(
        <AddTask isOpen={isOpenMock} closeModal={closeModalMock} />
      )
    );

    const taskTitle = screen.getByTestId('task-title-input');
    expect(taskTitle).toBeInTheDocument(); // Ensure the taskTitle input is available
    fireEvent.change(taskTitle, { target: { value: 'John' } });

    const taskDescription = screen.getByTestId('task-description-input');
    expect(taskDescription).toBeInTheDocument(); // Ensure the taskDescription input is available
    fireEvent.change(taskDescription, {
      target: { value: 'Task description' },
    });

    const submitButton = screen.getByRole('button', {
      name: 'submitButtonLabel',
    });
    fireEvent.click(submitButton);
    expect(setShowSpinnerMock).toHaveBeenCalledWith(true);
    expect(editTaskMock).toHaveBeenCalled();
    expect(showToasterMock).toHaveBeenCalledWith(
      'Task edited successfully !!!'
    );
    await waitFor(
      () => {
        expect(setShowSpinnerMock).toHaveBeenCalledWith(false);
      },
      { timeout: 1100 }
    );
  });

  it('should handle create task form action', async () => {
    editableTaskMock = {};
    render(
      renderWithCommonAndTaskContext(
        <AddTask isOpen={isOpenMock} closeModal={closeModalMock} />
      )
    );

    const submitButton = screen.getByRole('button', {
      name: 'submitButtonLabel',
    });
    fireEvent.click(submitButton);
    expect(setShowSpinnerMock).toHaveBeenCalledWith(true);
    expect(createTaskMock).toHaveBeenCalled();
    expect(showToasterMock).toHaveBeenCalledWith('Task added successfully !!!');
    await waitFor(
      () => {
        expect(setShowSpinnerMock).toHaveBeenCalledWith(false);
      },
      { timeout: 1100 }
    );
  });

  it('should handle error while creating task', async () => {
    editableTaskMock = {};

    const errorMessage = 'An error occurred';
    createTaskMock.mockImplementationOnce(() => {
      throw new Error(errorMessage);
    });

    render(
      renderWithCommonAndTaskContext(
        <AddTask isOpen={isOpenMock} closeModal={closeModalMock} />
      )
    );

    const submitButton = screen.getByRole('button', {
      name: 'submitButtonLabel',
    });
    fireEvent.click(submitButton);
    expect(createTaskMock).toHaveBeenCalled();
    expect(setShowSpinnerMock).toHaveBeenCalledWith(false);
  });

  it('should close the modal on click', async () => {
    render(
      renderWithCommonAndTaskContext(
        <AddTask isOpen={isOpenMock} closeModal={closeModalMock} />
      )
    );

    const submitButton = screen.getByRole('button', {
      name: 'closeButtonLabel',
    });
    fireEvent.click(submitButton);
    expect(closeModalMock).toHaveBeenCalled();
  });

  it('should call the useEffect when change in size', async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 200,
    });

    jest.spyOn(window, 'addEventListener');

    render(
      renderWithCommonAndTaskContext(
        <AddTask isOpen={isOpenMock} closeModal={closeModalMock} />
      )
    );

    act(() => {
      global.innerWidth = 200;

      global.dispatchEvent(new Event('resize'));
      fireEvent(window, new Event('resize'));

      expect(window.addEventListener).toHaveBeenCalled();
    });
  });
});
