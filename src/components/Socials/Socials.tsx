import React, { Dispatch, SetStateAction } from 'react';
import x from '@assets/content/xIcon.svg';
import instagram from '@assets/content/instaIcon.svg';
import facebook from '@assets/content/fbIcon.svg';
import artworks from '@assets/content/artworks.svg';
import './Socials.scss';

type SocialsProps = {
  showModalButton: boolean;
  setHideCard: Dispatch<SetStateAction<boolean>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const Socials: React.FC<SocialsProps> = ({
  showModalButton,
  setHideCard,
  setShowModal
}: SocialsProps) => {
  return (
    <div className="social-container">
      <img data-testid="x-test-icon" src={x} alt="x" />
      <img src={instagram} alt="instagram" />
      <img src={facebook} alt="facebook" />
      {showModalButton && (
        <div
          onClick={() => {
            setHideCard(true);
            setShowModal(true);
          }}
          data-testid="artworks-button">
          <img src={artworks} alt="artworks" />
        </div>
      )}
    </div>
  );
};

export default Socials;
