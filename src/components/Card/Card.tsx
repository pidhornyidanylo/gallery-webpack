import React, { useEffect, useRef, useState } from 'react';
import { ArtistType } from '@sections/Content/Content';
import ArrowIcon from '@components/ArrowIcon/ArrowIcon';
import { getBlackCharsWidth } from '@utils/getBlackCharsWidth';
import { useCheckOverlap } from '@utils/checkOverlap';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Card.scss';
import Modal from '@components/Modal/Modal';
import Socials from '@components/Socials/Socials';

gsap.registerPlugin(ScrollTrigger);

const Card = ({ artist }: { artist: ArtistType }) => {
  const [showModal, setShowModal] = useState(false);
  const [hideCard, setHideCard] = useState(false);
  const [blackCharsCount, setBlackCharsCount] = useState(3);
  const [showResponsiveName, setShowResponsiveName] = useState(false);
  const [showModalButton, setShowModalButton] = useState(false);
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
    const handleResize = () => {
      if (window.innerWidth < 1600) {
        setBlackCharsCount(4);
        if (window.innerWidth < 1300) {
          setShowResponsiveName(true);
        } else {
          setShowResponsiveName(false);
        }
        if (window.innerWidth < 991) {
          setShowModalButton(true);
        } else {
          setShowModalButton(false);
        }
      } else {
        setBlackCharsCount(3);
      }
    };

    const matchMedia = gsap.matchMedia();

    matchMedia.add('(min-width: 1300px)', () => {
      const blackChars = getBlackCharsWidth(firstNameCharsRef, blackCharsCount, secondNameCharsRef);

      if (firstNameRef.current && secondNameRef.current && imageRef.current) {
        const firstNameAnim = gsap.to(firstNameRef.current, {
          left:
            -firstNameRef.current.getBoundingClientRect().width +
            blackChars.totalWidthOfTheFirstNameBlackChars -
            firstNameAllowableDeviation
        });
        const secondNameAnim = gsap.to(secondNameRef.current, {
          right:
            -(
              secondNameRef.current.getBoundingClientRect().width -
              blackChars.totalWidthOfTheSecondNameBlackChars
            ) - secondNameAllowableDeviation
        });

        const scrollTrigger1 = gsap.to(firstNameRef.current, {
          scrollTrigger: {
            trigger: imageRef.current,
            scrub: 0.4,
            start: '-380px bottom',
            end: 'center top'
          },
          top: '20px'
        });

        const scrollTrigger2 = gsap.to(secondNameRef.current, {
          scrollTrigger: {
            trigger: imageRef.current,
            scrub: 0.4,
            start: '-380px bottom',
            end: 'center top'
          },
          bottom: '20px'
        });

        return () => {
          firstNameAnim.kill();
          secondNameAnim.kill();
          scrollTrigger1.kill();
          scrollTrigger2.kill();
        };
      }
    });

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      matchMedia.revert();
    };
  }, [blackCharsCount]);

  useEffect(() => {
    const matchMedia = gsap.matchMedia();

    matchMedia.add('(min-width: 1300px)', () => {
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

    return () => {
      matchMedia.revert();
    };
  });

  return (
    <div
      data-testid="artist-card-container"
      className={hideCard ? 'artist-card-hide' : 'artist-card'}>
      <div className="artist-card-innerContainer">
        {showResponsiveName && (
          <h2 className="artist-name-responsive">{artist.name.first + ' ' + artist.name.second}</h2>
        )}
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
        <Socials
          setHideCard={setHideCard}
          setShowModal={setShowModal}
          showModalButton={showModalButton}
        />
      </div>
      <div
        className="artworks-button"
        onClick={() => {
          setHideCard(true);
          setShowModal(true);
        }}>
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
