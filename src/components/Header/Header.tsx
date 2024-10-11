import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import Burger from '../Burger/Burger';
import './Header.scss';

const Header: React.FC = () => {
  const headerRef = useRef<HTMLHeadingElement | null>(null);
  const [showBurger, setShowBurger] = useState(false);
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowBurger(window.innerWidth < 991);
      setShowBurgerMenu(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <div className="logo-container">
        <h3 className="header-logo">Gallery</h3>
        <p className="header-routes">
          Home {'>'} Artists {'>'} Hyperrealism
        </p>
      </div>
      <nav className="header-navigation">
        {!showBurger && (
          <ul className="navigation-list">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/">Exhibitions</a>
            </li>
            <li>
              <a href="/">Artists</a>
            </li>
            <li>
              <a href="/">Contact Us</a>
            </li>
            <li>
              <a href="/">About Us</a>
            </li>
          </ul>
        )}
        {showBurger && (
          <Burger showBurgerMenu={showBurgerMenu} setShowBurgerMenu={setShowBurgerMenu} />
        )}
      </nav>
    </header>
  );
};

export default Header;
