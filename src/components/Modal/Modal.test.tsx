import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import Modal from './Modal';
import React from 'react';

describe('Modal component', () => {
  it('renders properly', () => {
    render(
      <Modal
        layout={true}
        setLayout={() => {}}
        setHideSection={() => {}}
        artistWorks={[]}
        artistName={'Mocker'}
      />
    );
    const artistName = screen.getByText(/mocker/i);
    expect(artistName).toBeInTheDocument();
  });
});
