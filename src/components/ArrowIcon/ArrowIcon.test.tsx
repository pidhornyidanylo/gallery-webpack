import '@testing-library/jest-dom';
import React from 'react';
import ArrowIcon from './ArrowIcon';
import { render, screen } from '@testing-library/react';

describe('Arrow icon', () => {
  it('renders properly', () => {
    render(<ArrowIcon type={'hero'} />);
    const spinningText = screen.getByText(
      /scroll down \. scroll down \. scroll down \. scroll down \./i
    );
    expect(spinningText).toBeInTheDocument();
  });
});
