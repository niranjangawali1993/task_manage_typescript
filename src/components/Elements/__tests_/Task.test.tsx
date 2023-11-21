import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import Task, { MemorizedTask } from '../Task';
import { MemorizedConfirmPopup } from '../../Modals/ConfirmPopup';
import { CommonContext, TaskContext } from '../../../contexts';
import { TaskType } from '../../../utility';

describe('Task', () => {
  let mockTask: TaskType, mockTaskLargeDescription: TaskType;
  let updatePopupStatus = jest.fn(),
    setEditableTask = jest.fn(),
    darkMode = false,
    setShowSpinner = jest.fn();

  let deleteTask = jest.fn();
  beforeEach(() => {
    mockTask = {
      title: 'Mock Task Title',
      description: 'Mock Task Description',
      id: 'mock-task-id',
      createdAt: new Date().toISOString(),
    };

    mockTaskLargeDescription = {
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      title: 'Mock Task Title',
      id: 'mock-task-id',
      createdAt: new Date().toISOString(),
    };

    updatePopupStatus = jest.fn();
  });

  const renderWithCommonAndTaskContext = (component: any) => (
    <Router>
      <TaskContext.Provider value={{ deleteTask } as any}>
        <CommonContext.Provider
          value={
            {
              updatePopupStatus,
              setEditableTask,
              darkMode,
              setShowSpinner,
            } as any
          }
        >
          {component}
        </CommonContext.Provider>
      </TaskContext.Provider>
    </Router>
  );

  it('should expands task description when "Read More" link is clicked', async () => {
    render(renderWithCommonAndTaskContext(<Task task={mockTask} />));

    await waitFor(
      () => {
        fireEvent.click(screen.getByTestId('description'));
        expect(screen.getByTestId('description')).toHaveTextContent(
          'Mock Task Description'
        );
      },
      { timeout: 2000 }
    );
  });

  it('should renders loading skeleton when task prop is not provided', () => {
    render(renderWithCommonAndTaskContext(<Task task={mockTask} />));
    expect(screen.getByTestId('loading-skeleton-display')).toBeInTheDocument();
  });

  it('should renders task details correctly', async () => {
    render(renderWithCommonAndTaskContext(<Task task={mockTask} />));

    await waitFor(
      () => {
        expect(screen.getByTestId('title')).toBeInTheDocument();
        expect(screen.getByTestId('description')).toBeInTheDocument();
        expect(screen.getByTestId('createdAt')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it('should redirects to task detail page when task title link is clicked', async () => {
    render(renderWithCommonAndTaskContext(<Task task={mockTask} />));

    await waitFor(
      () => {
        fireEvent.click(screen.getByTestId('title'));
        expect(screen.getByText('Mock Task Title')).toBeInTheDocument();
      },
      { timeout: 1500 }
    );
  });

  it('should expands short task description when "Read More" link is clicked', async () => {
    render(renderWithCommonAndTaskContext(<Task task={mockTask} />));

    await waitFor(
      () => {
        fireEvent.click(screen.getByTestId('description'));
        expect(screen.getByTestId('description')).toHaveTextContent(
          'Mock Task Description'
        );
      },
      { timeout: 1500 }
    );
  });

  it('should show the substring when description is larger than 200 letters', async () => {
    render(
      renderWithCommonAndTaskContext(<Task task={mockTaskLargeDescription} />)
    );

    await waitFor(
      () => {
        fireEvent.click(screen.getByTestId('description'));
        expect(screen.getByTestId('description')).toHaveTextContent(
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type ataskReadMoreLabel"
        );
      },
      { timeout: 1500 }
    );
  });

  it('should handle the delete operation when delete button is clicked', async () => {
    render(renderWithCommonAndTaskContext(<Task task={mockTask} />));

    await waitFor(
      async () => {
        const deleteButton = await screen.findByTitle('Delete');
        fireEvent.click(deleteButton);
        const popupModal = screen.getByTestId('popup-modal');
        expect(popupModal).toBeInTheDocument();
        const deleteConfirmButton = await screen.getByRole('button', {
          name: 'positiveResponseConfirmPopup',
        });
        fireEvent.click(deleteConfirmButton);
        expect(deleteConfirmButton).toBeInTheDocument();
      },
      { timeout: 1500 }
    );
  });

  it('should handle the error when clicked on the delete button', async () => {
    render(renderWithCommonAndTaskContext(<Task task={mockTask} />));
    deleteTask.mockImplementationOnce(() => {
      throw new Error('An error occurred');
    });
    await waitFor(
      async () => {
        const deleteButton = await screen.findByTitle('Delete');
        fireEvent.click(deleteButton);

        const popupModal = screen.getByTestId('popup-modal');
        expect(popupModal).toBeInTheDocument();

        const deleteConfirmButton = await screen.getByRole('button', {
          name: 'positiveResponseConfirmPopup',
        });
        fireEvent.click(deleteConfirmButton);
      },
      { timeout: 1500 }
    );
  });

  it('should show the edit popup when clicked on the edit button', async () => {
    render(renderWithCommonAndTaskContext(<Task task={mockTask} />));
    await waitFor(
      async () => {
        const editButton = await screen.findByTestId('edit-button');
        expect(editButton).toBeInTheDocument();
        fireEvent.click(editButton);
      },
      { timeout: 1500 }
    );
  });

  it('should handle the dark mode', async () => {
    darkMode = true;
    render(renderWithCommonAndTaskContext(<Task task={mockTask} />));
  });

  /*
  it('should call the handle delete operation when confirmed', async () => {
    const mockedHandleOperation = jest.fn();
    const mockedShowConfirmPopup = jest.fn();

    render(
      <Router>
        <MemorizedConfirmPopup
          confirmPopup={true}
          showConfirmPopup={mockedShowConfirmPopup}
          handleOperation={mockedHandleOperation}
          popupText='Delete Confirm Popup'
        />
      </Router>
    );

    const confirmButton = screen.getByRole('button', {
      name: 'positiveResponseConfirmPopup',
    });

    fireEvent.click(confirmButton);
    expect(mockedHandleOperation).toHaveBeenCalled();
  });
  */
});
