import React from 'react';
import HyperrealismIcon from '@assets/hero/Hyperrealism.svg';
import ArrowIcon from '@components/ArrowIcon/ArrowIcon';
import './Hero.scss';

const Hero: React.FC = () => {
  return (
    <section id="hero">
      <div data-testid="hero-banner" className="hero-banner" />
      <img src={HyperrealismIcon} width="100%" alt="hyperrealism" />
      <ArrowIcon />
    </section>
  );
};

export default Hero;
