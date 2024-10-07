import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from './Card';

jest.mock('swiper/react', () => ({
  Swiper: () => null,
  SwiperSlide: () => null
}));

jest.mock('swiper/modules', () => ({
  Mousewheel: {}
}));

jest.mock('gsap', () => {
  const originalGsap = jest.requireActual('gsap');
  return {
    ...originalGsap,
    registerPlugin: jest.fn(),
    to: jest.fn()
  };
});

jest.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: jest.fn().mockReturnValue({
      kill: jest.fn()
    })
  }
}));

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
  it('opens modal after clicking button and renders a name', () => {
    render(
      <Card
        artist={{
          name: {
            first: 'Stanley',
            second: 'Tester'
          },
          photo: '/assets/content/stanley/stanley.jpg',
          artworks: [
            '/assets/content/stanley/1.jpg',
            '/assets/content/stanley/2.jpg',
            '/assets/content/stanley/3.jpg',
            '/assets/content/stanley/4.jpg',
            '/assets/content/stanley/5.jpg',
            '/assets/content/stanley/6.jpg',
            '/assets/content/stanley/7.jpg',
            '/assets/content/stanley/8.jpg'
          ]
        }}
      />
    );
    const spinningText = screen.getByTestId('angled-arrow');
    expect(spinningText).toBeInTheDocument();
    fireEvent.click(spinningText);
    const artistsNameInModal = screen.getByText(/stanley tester/i);
    expect(artistsNameInModal).toBeInTheDocument();
  });
});
