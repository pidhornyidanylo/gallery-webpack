import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Hero from './Hero';
import React from 'react';

jest.mock('@assets/hero/Hyperrealism.svg', () => 'svg');

describe('Hero section', () => {
  it('renders banner element', () => {
    render(<Hero />);
    const banner = screen.getByTestId('hero-banner');
    expect(banner).toBeInTheDocument();
  });
  it('renders img element', () => {
    render(<Hero />);
    const imageElement = screen.getByRole('img', {
      name: /hyperrealism/i
    });
    expect(imageElement).toBeInTheDocument();
  });
});
