import { gsap } from 'gsap';

export const defineNameElementsPositions = (
  firstName: HTMLHeadingElement | null,
  secondName: HTMLHeadingElement | null,
  image: HTMLImageElement | null,
  blackChars: {
    totalWidthOfTheFirstNameBlackChars: number;
    totalWidthOfTheSecondNameBlackChars: number;
  }
): void => {
  const allowableNameElementDeviation = 4;
  gsap.to(firstName, {
    left:
      -firstName!.getBoundingClientRect().width +
      blackChars.totalWidthOfTheFirstNameBlackChars -
      allowableNameElementDeviation
  });
  gsap.to(secondName, {
    right:
      -(
        secondName!.getBoundingClientRect().width - blackChars.totalWidthOfTheSecondNameBlackChars
      ) - allowableNameElementDeviation
  });

  gsap.to(firstName, {
    scrollTrigger: {
      trigger: image,
      scrub: 0.4,
      start: '-300px bottom',
      invalidateOnRefresh: true,
      end: 'center top'
    },
    top: '30px'
  });

  gsap.to(secondName, {
    scrollTrigger: {
      trigger: image,
      scrub: 0.4,
      invalidateOnRefresh: true,
      start: '-300px bottom',
      end: 'center top'
    },
    bottom: '30px'
  });
};
