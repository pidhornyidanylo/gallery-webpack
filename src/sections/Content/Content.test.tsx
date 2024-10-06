import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Content from './Content';

describe('Content component', () => {
  it('renders section properly', () => {
    render(<Content />);
    const section = screen.getByTestId('content-section');
    expect(section).toBeInTheDocument();
  });
});
