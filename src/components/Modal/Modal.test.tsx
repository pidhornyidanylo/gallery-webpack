import '@testing-library/jest-dom';
import { screen, render, fireEvent } from '@testing-library/react';
import Modal from './Modal';
import React from 'react';

jest.mock('swiper/react', () => ({
  Swiper: () => null,
  SwiperSlide: () => null
}));

jest.mock('swiper/modules', () => ({
  Mousewheel: {}
}));

jest.mock('swiper/css', () => jest.fn());

jest.mock('gsap', () => {
  const originalGsap = jest.requireActual('gsap');
  return {
    ...originalGsap,
    registerPlugin: jest.fn(),
    to: jest.fn(),
    fromTo: jest.fn()
  };
});

jest.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: jest.fn().mockReturnValue({
      kill: jest.fn()
    })
  }
}));

describe('Modal component', () => {
  it('renders properly', () => {
    render(
      <Modal
        layout={true}
        setLayout={() => {}}
        setHideSection={() => {}}
        artistWorks={[
          '/assets/content/stanley/1.jpg',
          '/assets/content/stanley/2.jpg',
          '/assets/content/stanley/3.jpg',
          '/assets/content/stanley/4.jpg',
          '/assets/content/stanley/5.jpg',
          '/assets/content/stanley/6.jpg',
          '/assets/content/stanley/7.jpg',
          '/assets/content/stanley/8.jpg'
        ]}
        artistName={'Mocker'}
      />
    );
    const artistName = screen.getByText(/mocker/i);
    expect(artistName).toBeInTheDocument();
  });
  it('closes modal after clicking button', () => {
    render(
      <Modal
        layout={true}
        setLayout={() => {}}
        setHideSection={() => {}}
        artistWorks={[
          '/assets/content/stanley/1.jpg',
          '/assets/content/stanley/2.jpg',
          '/assets/content/stanley/3.jpg',
          '/assets/content/stanley/4.jpg',
          '/assets/content/stanley/5.jpg',
          '/assets/content/stanley/6.jpg',
          '/assets/content/stanley/7.jpg',
          '/assets/content/stanley/8.jpg'
        ]}
        artistName={'Stanley Tester'}
      />
    );
    const closeButton = screen.getByRole('img', {
      name: /modal-close/i
    });
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    const artistsNameInModal = screen.getByText(/stanley tester/i);
    expect(artistsNameInModal).toBeInTheDocument();
  });
});
