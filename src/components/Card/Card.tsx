import React, { useEffect, useRef, useState } from 'react';
import { ArtistType } from '@sections/Content/Content';
import ArrowIcon from '@components/ArrowIcon/ArrowIcon';
import { getBlackCharsWidth } from '@utils/getBlackCharsWidth';
import { checkOverlap } from '@utils/checkOverlap';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Modal from '@components/Modal/Modal';
import Socials from '@components/Socials/Socials';
import './Card.scss';
import { defineNameElementsPositions } from '@utils/defineNameElementsPositions';

gsap.registerPlugin(ScrollTrigger);

const Card = ({ artist }: { artist: ArtistType }) => {
  const [showModal, setShowModal] = useState(false);
  const [hideCard, setHideCard] = useState(false);

  const imageRef = useRef<HTMLImageElement | null>(null);
  const firstNameCharsRef = useRef<HTMLSpanElement[] | null[]>([]);
  const secondNameCharsRef = useRef<HTMLSpanElement[] | null[]>([]);
  const artistCardContainerRef = useRef<HTMLDivElement | null>(null);
  const firstNameRef = useRef<HTMLHeadingElement | null>(null);
  const secondNameRef = useRef<HTMLHeadingElement | null>(null);

  const isXLScreen = window.matchMedia('(min-width: 1300px)').matches;

  useEffect(() => {
    const firstName = firstNameRef.current;
    const secondName = secondNameRef.current;
    const image = imageRef.current;

    const blackChars = getBlackCharsWidth(firstNameCharsRef.current, secondNameCharsRef.current);

    defineNameElementsPositions(firstName, secondName, image, blackChars);
  }, [firstNameRef, secondNameRef, imageRef, artistCardContainerRef]);

  useEffect(() => {
    if (isXLScreen) {
      const scrollTrigger = ScrollTrigger.create({
        trigger: imageRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: () => {
          checkOverlap(imageRef, firstNameCharsRef);
          checkOverlap(imageRef, secondNameCharsRef);
        }
      });
      return () => {
        scrollTrigger.kill();
      };
    }
  }, [isXLScreen]);

  const handleShowArtworksButtonClick = () => {
    setHideCard(true);
    setShowModal(true);
  };


  return (
    <div
      ref={artistCardContainerRef}
      data-testid="artist-card-container"
      className={hideCard ? 'artist-card-hide' : 'artist-card'}>
      <div className="artist-card-innerContainer">
        <h2 className="artist-name-responsive">{artist.name.first + ' ' + artist.name.second}</h2>
        <img
          loading="lazy"
          ref={imageRef}
          src={artist.photo}
          alt={`${artist.name.second} portrait`}
        />
        <h3 className="artist-first" ref={firstNameRef}>
          {Array.from(artist.name.first).map((char, i) => (
            <span
              key={i}
              ref={(el) => (firstNameCharsRef!.current[i] = el)}
              className="char char-first-name">
              {char}
            </span>
          ))}
        </h3>

        <h3 className="artist-second" ref={secondNameRef}>
          {Array.from(artist.name.second).map((char, i) => (
            <span
              key={i}
              ref={(el) => (secondNameCharsRef!.current[i] = el)}
              className="char char-second-name">
              {char}
            </span>
          ))}
        </h3>
        <Socials setHideCard={setHideCard} setShowModal={setShowModal} />
      </div>
      <div className="artworks-button" onClick={handleShowArtworksButtonClick}>
        <ArrowIcon type="content" />
      </div>
      <Modal
        layout={showModal}
        setLayout={setShowModal}
        setHideSection={setHideCard}
        artistWorks={artist.artworks}
        artistName={artist.name.first + ' ' + artist.name.second}
      />
    </div>
  );
};

export default Card;
