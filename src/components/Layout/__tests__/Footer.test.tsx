import { render, screen } from '@testing-library/react';
import Footer from '../Footer';
import { MemoryRouter as Router } from 'react-router-dom'; //

describe('Footer test suite', () => {
  it('should render correctly', () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/PrivacyPolicy/i)).toBeInTheDocument();
    expect(screen.getByText(/Licensing/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
  });
  it('should correctly render Links', () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/PrivacyPolicy/i)).toBeInTheDocument();
    expect(screen.getByText(/Licensing/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
  });
});
