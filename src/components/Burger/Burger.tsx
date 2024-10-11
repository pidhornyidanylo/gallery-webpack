import React from 'react';
import { gsap } from 'gsap';
import { type Dispatch, type SetStateAction, useEffect } from 'react';
import './Burger.scss';

type BurgerProps = {
  showBurgerMenu: boolean;
  setShowBurgerMenu: Dispatch<SetStateAction<boolean>>;
};

const Burger: React.FC<BurgerProps> = ({ showBurgerMenu, setShowBurgerMenu }: BurgerProps) => {
  useEffect(() => {
    const tl = gsap.timeline();
    if (showBurgerMenu) {
      tl.to('#line-two', { opacity: 0, duration: 0.05, translateX: 20 })
        .to('#line-one', { rotate: 45, translateY: 10, duration: 0.4 })
        .to('#line-three', { rotate: -45, translateY: -12, duration: 0.4 })
        .to('.navigation-burger', { rotate: 360, translateX: -130 })
        .to('.header', {
          backgroundColor: 'rgba(0, 0, 0, .95)',
          height: '200px',
          duration: 0.5
        })
        .to('.navigation-list-burger', { opacity: 1, duration: 0.4 })
        .to('.navigation-list-burger li', {
          opacity: 1,
          translateX: 0,
          duration: 0.1,
          stagger: 0.1
        });
    } else {
      tl.to('.navigation-list-burger', { opacity: 0, duration: 0.5 })
        .to('.navigation-list-burger li', {
          opacity: 0,
          translateX: 200,
          duration: 0.2,
          stagger: 0.2
        })
        .to('.header', {
          backgroundColor: 'rgba(0, 0, 0, .8)',
          height: '120px',
          duration: 0.2,
        })
        .to('.navigation-burger', { rotate: 0, translateX: 0 })
        .to('#line-one', { rotate: 0, translateY: 0, duration: 0.4 })
        .to('#line-three', { rotate: 0, translateY: 0, duration: 0.4 })
        .to('#line-two', { opacity: 1, duration: 0.05, translateX: 0 });
    }

    return () => {
      tl.kill();
    };
  }, [showBurgerMenu]);
  return (
    <>
      <div
        data-testid="burger"
        className="navigation-burger"
        onClick={() => setShowBurgerMenu(!showBurgerMenu)}>
        <span id="line-one" />
        <span id="line-two" />
        <span id="line-three" />
      </div>
      <ul className={`navigation-list-burger ${showBurgerMenu ? 'show' : 'hide'}`}>
        <li id="li-one">
          <a href="/">Home</a>
        </li>
        <li id="li-two">
          <a href="/">Exhibitions</a>
        </li>
        <li id="li-three">
          <a href="/">Artists</a>
        </li>
        <li id="li-four">
          <a href="/">Contact Us</a>
        </li>
        <li id="li-five">
          <a href="/">About Us</a>
        </li>
      </ul>
    </>
  );
};

export default Burger;
