import { MemoryRouter as Router } from 'react-router-dom';
import ConfirmPopup from '../ConfirmPopup';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Confirm Popup test suite', () => {
  let confirmPopupMock: boolean = true;
  let showConfirmPopupMock: any;
  let handleOperationMock: any;
  let popupTextMock: string;

  beforeEach(() => {
    confirmPopupMock = true;
    showConfirmPopupMock = jest.fn();
    handleOperationMock = jest.fn();
    popupTextMock = 'Demo Text';
  });

  it('should render correctly', () => {
    render(
      <Router>
        <ConfirmPopup
          confirmPopup={confirmPopupMock}
          showConfirmPopup={showConfirmPopupMock}
          handleOperation={handleOperationMock}
          popupText={popupTextMock}
        />
      </Router>
    );

    expect(screen.getByText('Demo Text')).toBeInTheDocument();
  });

  it('should close modal on click on close modal button', () => {
    render(
      <Router>
        <ConfirmPopup
          confirmPopup={confirmPopupMock}
          showConfirmPopup={showConfirmPopupMock}
          handleOperation={handleOperationMock}
          popupText={popupTextMock}
        />
      </Router>
    );

    const closeModalButton = screen.getByRole('button', {
      name: 'Close modal',
    });

    fireEvent.click(closeModalButton);
  });

  it('should handle the positive button operation', async () => {
    render(
      <Router>
        <ConfirmPopup
          confirmPopup={confirmPopupMock}
          showConfirmPopup={showConfirmPopupMock}
          handleOperation={handleOperationMock}
          popupText={popupTextMock}
        />
      </Router>
    );

    const positiveActionButton = screen.getByRole('button', {
      name: 'positiveResponseConfirmPopup',
    });
    expect(positiveActionButton).toBeInTheDocument();
    fireEvent.click(positiveActionButton);
    expect(handleOperationMock).toHaveBeenCalled();
  });

  it('should handle the negativeß button operation', async () => {
    render(
      <Router>
        <ConfirmPopup
          confirmPopup={confirmPopupMock}
          showConfirmPopup={showConfirmPopupMock}
          handleOperation={handleOperationMock}
          popupText={popupTextMock}
        />
      </Router>
    );

    const negativeActionButton = screen.getByRole('button', {
      name: 'negativeResponseConfirmPopup',
    });
    expect(negativeActionButton).toBeInTheDocument();
    fireEvent.click(negativeActionButton);
    expect(showConfirmPopupMock).toHaveBeenCalled();
    expect(showConfirmPopupMock).toHaveBeenCalledWith(false);
  });
});
