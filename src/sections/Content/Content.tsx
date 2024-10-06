import React, { useEffect } from 'react';
import Card from '@components/Card/Card';
import artists from '../../artists.json';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Content.scss';

gsap.registerPlugin(ScrollTrigger);

export type ArtistType = {
  name: {
    first: string;
    second: string;
  };
  photo: string;
  artworks: string[];
};
const Content: React.FC = () => {
  useEffect(() => {
    const cards = document.querySelectorAll('.artist-slide');
    cards.forEach((card) => {
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: true,
          pinSpacing: false
        },
        scale: 0.8,
        opacity: 0
      });

      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        y: -200
      });
    });
  }, []);

  return (
    <section data-testid="content-section" id="content">
      {artists.map((artist: ArtistType) => (
        <div className="artist-slide" key={artist.name.second}>
          <Card artist={artist} />
        </div>
      ))}
    </section>
  );
};

export default Content;
