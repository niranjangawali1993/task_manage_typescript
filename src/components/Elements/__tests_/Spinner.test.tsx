import { render, screen } from '@testing-library/react';
import Spinner from '../Spinner';
import { BallTriangle } from 'react-loader-spinner';

describe('Spinner test suite', () => {
  it('should render the spinner component', () => {
    const { container, getByLabelText } = render(<Spinner />);
    expect(container.firstChild).toHaveClass('justify-center');
    const ballTriangle = getByLabelText('ball-triangle-loading');
    expect(ballTriangle).toBeInTheDocument();
  });
});
