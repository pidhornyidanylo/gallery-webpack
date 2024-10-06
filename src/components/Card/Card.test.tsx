import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card component', () => {
  it('renders first name properly', () => {
    render(
      <Card
        artist={{
          name: {
            first: 'Mock',
            second: 'Artist'
          },
          photo: '',
          artworks: []
        }}
      />
    );
    const heading = screen.getByRole('heading', {
      name: /m o c k/i
    });
    expect(heading).toBeInTheDocument();
  });
  it('renders second name properly', () => {
    render(
      <Card
        artist={{
          name: {
            first: 'Mock',
            second: 'Artist'
          },
          photo: '',
          artworks: []
        }}
      />
    );
    const heading = screen.getByRole('heading', {
      name: /a r t i s t/i
    });
    expect(heading).toBeInTheDocument();
  });
});
