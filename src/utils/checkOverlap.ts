import { gsap } from 'gsap';

export const checkOverlap = (
  imageRef: React.MutableRefObject<HTMLImageElement | null>,
  chars: React.MutableRefObject<HTMLSpanElement[] | null[]>
) => {
  if (!imageRef.current) return;
  const imageRect = imageRef.current.getBoundingClientRect();
  chars.current.forEach((char) => {
    if (!char) return;
    const charRect = char.getBoundingClientRect();
    const isOverlapping = charRect.left < imageRect.right && charRect.right > imageRect.left;

    gsap.to(char, {
      color: isOverlapping ? 'black' : 'white',
      duration: 1.5
    });
  });
};
