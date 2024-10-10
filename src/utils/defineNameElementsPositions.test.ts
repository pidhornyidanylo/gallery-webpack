import { gsap } from 'gsap';
import { defineNameElementsPositions } from './defineNameElementsPositions';

jest.mock('gsap', () => {
  const originalGsap = jest.requireActual('gsap');
  return {
    ...originalGsap,
    to: jest.fn()
  };
});

gsap.to = jest.fn();

describe('defineNameElementsPositions function', () => {
  let firstName: HTMLHeadingElement | null;
  let secondName: HTMLHeadingElement | null;
  let image: HTMLImageElement | null;
  let blackChars: {
    totalWidthOfTheFirstNameBlackChars: number;
    totalWidthOfTheSecondNameBlackChars: number;
  };
  const allowableNameElementDeviation = 4;
  beforeEach(() => {
    firstName = document.createElement('h2');
    firstName.getBoundingClientRect = jest.fn(() => ({
      left: 210,
      right: 250,
      top: 0,
      bottom: 20,
      width: 500,
      height: 20,
      x: 210,
      y: 0,
      toJSON: () => {}
    }));
    secondName = document.createElement('h2');
    secondName.getBoundingClientRect = jest.fn(() => ({
      left: 210,
      right: 250,
      top: 0,
      bottom: 20,
      width: 400,
      height: 20,
      x: 210,
      y: 0,
      toJSON: () => {}
    }));
    image = document.createElement('img');
    blackChars = {
      totalWidthOfTheFirstNameBlackChars: 150,
      totalWidthOfTheSecondNameBlackChars: 240
    };
  });
  it('should apply proper positions to elements', () => {
    defineNameElementsPositions(firstName, secondName, image, blackChars);
    expect(gsap.to).toHaveBeenCalledTimes(4);
    expect(gsap.to).toHaveBeenNthCalledWith(1, firstName, {
      left:
        -firstName!.getBoundingClientRect().width +
        blackChars.totalWidthOfTheFirstNameBlackChars -
        allowableNameElementDeviation
    });
    expect(gsap.to).toHaveBeenNthCalledWith(2, secondName, {
      right:
        -(
          secondName!.getBoundingClientRect().width - blackChars.totalWidthOfTheSecondNameBlackChars
        ) - allowableNameElementDeviation
    });
    expect(gsap.to).toHaveBeenNthCalledWith(3, firstName, {
      scrollTrigger: {
        trigger: image,
        scrub: 0.4,
        start: '-300px bottom',
        invalidateOnRefresh: true,
        end: 'center top'
      },
      top: '30px'
    });
    expect(gsap.to).toHaveBeenNthCalledWith(4, secondName, {
      scrollTrigger: {
        trigger: image,
        scrub: 0.4,
        invalidateOnRefresh: true,
        start: '-300px bottom',
        end: 'center top'
      },
      bottom: '30px'
    });
  });
});
