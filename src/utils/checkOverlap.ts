import { gsap } from 'gsap';

export const useCheckOverlap = (
  imageRef: React.MutableRefObject<HTMLImageElement | null>,
  chars: React.MutableRefObject<HTMLSpanElement[] | null[]>
) => {
  const overlap = () => {
    if (!imageRef.current) return;
    const imageRect = imageRef.current.getBoundingClientRect();
    chars.current.forEach((char) => {
      if (!char) return;
      const charRect = char.getBoundingClientRect();
      const isOverlapping = charRect.left < imageRect.right && charRect.right > imageRect.left;

      gsap.to(char, {
        color: isOverlapping ? 'black' : 'white',
        duration: 0.2
      });
    });
  };
  return overlap;
};
