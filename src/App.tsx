import React from 'react';
import Content from '@sections/Content/Content';
import Hero from '@sections/Hero/Hero';
import Header from '@components/Header/Header';
import './App.css';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Hero />
      <Content />
    </>
  );
};

export default App;
