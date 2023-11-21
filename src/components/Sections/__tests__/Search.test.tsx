import { MemoryRouter as Router } from 'react-router-dom';
import { TaskContext } from '../../../contexts';
import { fireEvent, render, screen } from '@testing-library/react';
import Search from '../Search';

describe('Search test suite', () => {
  let searchTaskMock: any, getTasksMock: any;

  beforeEach(() => {
    searchTaskMock = jest.fn();
    getTasksMock = jest.fn();
  });

  const renderWithTaskContext = (component: any) => {
    return (
      <Router>
        <TaskContext.Provider
          value={{ searchTask: searchTaskMock, getTasks: getTasksMock } as any}
        >
          {component}
        </TaskContext.Provider>
      </Router>
    );
  };

  it('should render correctly', () => {
    render(renderWithTaskContext(<Search />));
  });

  it('should contain both mobile and web input boxes', () => {
    render(renderWithTaskContext(<Search />));
    expect(screen.getByTestId('search-field-web')).toBeInTheDocument();
    expect(screen.getByTestId('search-field-mobile')).toBeInTheDocument();
  });

  it('should search the text when input added to the search field for web view', () => {
    render(renderWithTaskContext(<Search />));
    const inputField = screen.getByTestId('search-field-web');
    fireEvent.change(inputField, { target: { value: 'Search value' } });
  });

  it('should search the text when input added to the search field for mobile view', () => {
    render(renderWithTaskContext(<Search />));
    const inputField = screen.getByTestId('search-field-mobile');
    fireEvent.change(inputField, { target: { value: 'Search value' } });
  });

  it('should show clear button when search content is present in the input field for web view', () => {
    render(renderWithTaskContext(<Search />));
    const inputField = screen.getByTestId('search-field-web');
    fireEvent.change(inputField, { target: { value: 'Search value' } });

    const clearButtonWeb = screen.getByTestId('clear-search-button-web');
    expect(clearButtonWeb).toBeInTheDocument();
    fireEvent.click(clearButtonWeb);
    expect(getTasksMock).toHaveBeenCalled();
  });

  it('should show clear button when search content is present in the input field for mobile view', () => {
    render(renderWithTaskContext(<Search />));
    const inputField = screen.getByTestId('search-field-mobile');
    fireEvent.change(inputField, { target: { value: 'Search value' } });

    const clearButtonWeb = screen.getByTestId('clear-search-button-mobile');
    expect(clearButtonWeb).toBeInTheDocument();
    fireEvent.click(clearButtonWeb);
    expect(getTasksMock).toHaveBeenCalled();
  });

  it('should handle the error while getting tasks', () => {
    getTasksMock.mockImplementationOnce(() => {
      throw new Error('An error occurred');
    });
    render(renderWithTaskContext(<Search />));
    const inputField = screen.getByTestId('search-field-web');
    fireEvent.change(inputField, { target: { value: 'Search value' } });

    const clearButtonWeb = screen.getByTestId('clear-search-button-web');
    expect(clearButtonWeb).toBeInTheDocument();
    fireEvent.click(clearButtonWeb);
    expect(getTasksMock).toHaveBeenCalled();
  });
});
