import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import React from 'react';

describe('Header component', () => {
  it('should render header', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });
  it('renders logo', () => {
    render(<Header />);
    const logo = screen.getByRole('heading', {
      name: /gallery/i
    });
    expect(logo).toBeInTheDocument();
  });
  it('renders routes path', () => {
    render(<Header />);
    const routesPath = screen.getByText(/home > artists > hyperrealism/i);
    expect(routesPath).toBeInTheDocument();
  });
  it('renders navigation', () => {
    render(<Header />);
    const navLink = screen.getByRole('link', {
      name: /exhibitions/i
    });
    expect(navLink).toBeInTheDocument();
  });
});
