import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Burger from './Burger';
import React from 'react';

jest.mock('gsap', () => {
  const originalGsap = jest.requireActual('gsap');
  return {
    ...originalGsap,
    registerPlugin: jest.fn(),
    to: jest.fn(),
    timeline: jest.fn()
  };
});

describe('Burger component', () => {
  it('renders properly when menu has "hide" class', () => {
    render(<Burger showBurgerMenu={false} setShowBurgerMenu={() => {}} />);
    const burger = screen.getByTestId('burger');
    expect(burger).toBeInTheDocument();
    const menu = screen.queryByRole('list');
    expect(menu).toHaveClass('hide');
  });
  it('renders properly when menu has "show" class', () => {
    render(<Burger showBurgerMenu={true} setShowBurgerMenu={() => {}} />);
    const burger = screen.getByTestId('burger');
    expect(burger).toBeInTheDocument();
    const menu = screen.queryByRole('list');
    expect(menu).toHaveClass('show');
  });
  it('shows menu when burger is clicked', () => {
    const setShowBurgerMenu = jest.fn();
    render(<Burger showBurgerMenu={false} setShowBurgerMenu={setShowBurgerMenu} />);
    const burger = screen.getByTestId('burger');
    fireEvent.click(burger);
    expect(setShowBurgerMenu).toHaveBeenCalledWith(true);
  });
  it('hides menu when burger is clicked again', () => {
    const setShowBurgerMenu = jest.fn();
    render(<Burger showBurgerMenu={true} setShowBurgerMenu={setShowBurgerMenu} />);
    const burger = screen.getByTestId('burger');
    fireEvent.click(burger);
    expect(setShowBurgerMenu).toHaveBeenCalledWith(false);
  });
});
