import '@testing-library/jest-dom';
import { screen, render, fireEvent } from '@testing-library/react';
import Socials from './Socials';
import React from 'react';

describe('Socials component', () => {
  it('renders icons', () => {
    render(<Socials showModalButton={false} setHideCard={() => {}} setShowModal={() => {}} />);
    const xIcon = screen.getByTestId('x-test-icon');
    expect(xIcon).toBeInTheDocument();
  });
  it('renders artworks icon if showModalButton={true}', () => {
    render(<Socials showModalButton={true} setHideCard={() => {}} setShowModal={() => {}} />);
    const artWorksIcon = screen.getByTestId('artworks-button');
    expect(artWorksIcon).toBeInTheDocument();
  });
});
