import React, { useEffect, useRef, useState } from 'react';
import { ArtistType } from '@sections/Content/Content';
import ArrowIcon from '@components/ArrowIcon/ArrowIcon';
import { getBlackCharsWidth } from '@utils/getBlackCharsWidth';
import { useCheckOverlap } from '@utils/checkOverlap';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Card.scss';
import Modal from '@components/Modal/Modal';

gsap.registerPlugin(ScrollTrigger);

const Card = ({ artist }: { artist: ArtistType }) => {
  const [showModal, setShowModal] = useState(false);
  const [hideCard, setHideCard] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const firstNameCharsRef = useRef<HTMLSpanElement[] | null[]>([]);
  const secondNameCharsRef = useRef<HTMLSpanElement[] | null[]>([]);
  const firstNameRef = useRef<HTMLHeadingElement | null>(null);
  const secondNameRef = useRef<HTMLHeadingElement | null>(null);
  const overlap1 = useCheckOverlap(imageRef, firstNameCharsRef);
  const overlap2 = useCheckOverlap(imageRef, secondNameCharsRef);
  const firstNameAllowableDeviation = 4;
  const secondNameAllowableDeviation = 4;

  useEffect(() => {
    const blackChars = getBlackCharsWidth(firstNameCharsRef, secondNameCharsRef);
    if (typeof window !== 'undefined') {
      gsap.to(firstNameRef.current, {
        left:
          -firstNameRef.current!.getBoundingClientRect().width +
          blackChars.totalWidthOfTheFirstNameBlackChars -
          firstNameAllowableDeviation
      });
      gsap.to(firstNameRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
          scrub: 0.4,
          start: '-380px bottom',
          end: 'center top'
        },
        top: '20px'
      });
      gsap.to(secondNameRef.current, {
        right:
          -(
            secondNameRef.current!.getBoundingClientRect().width -
            blackChars.totalWidthOfTheSecondNameBlackChars
          ) - secondNameAllowableDeviation
      });
      gsap.to(secondNameRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
          scrub: 0.4,
          start: '-380px bottom',
          end: 'center top'
        },
        bottom: '20px'
      });
    }
  }, []);

  useEffect(() => {
    const scrollTrigger = ScrollTrigger.create({
      trigger: imageRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: () => {
        overlap1();
        overlap2();
      }
    });
    return () => {
      scrollTrigger.kill();
    };
  });

  return (
    <div data-testid="artist-card-container" className="artist-card">
      <div className="artist-card-innerContainer">
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
              className="char char-first-name"
            >
              {char}
            </span>
          ))}
        </h3>

        <h3 className="artist-second" ref={secondNameRef}>
          {Array.from(artist.name.second).map((char, i) => (
            <span
              key={i}
              ref={(el) => (secondNameCharsRef!.current[i] = el)}
              className="char char-second-name"
            >
              {char}
            </span>
          ))}
        </h3>
      </div>
      <div onClick={() => setShowModal(true)}>
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
