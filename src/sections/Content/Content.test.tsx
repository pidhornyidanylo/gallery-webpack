import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Content from './Content';
import React from 'react';

beforeAll(() => {
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: function () {},
        removeListener: function () {}
      };
    };
});

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
    to: jest.fn(),
    matchMedia: jest.fn()
  };
});

jest.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: jest.fn().mockReturnValue({
      kill: jest.fn()
    }),
    refresh: jest.fn()
  }
}));

describe('Content component', () => {
  it('renders section properly', () => {
    render(<Content />);
    const section = screen.getByTestId('content-section');
    expect(section).toBeInTheDocument();
  });
});
