import { MutableRefObject } from 'react';
import { gsap } from 'gsap';
import { checkOverlap } from './checkOverlap';

jest.mock('gsap', () => {
  const originalGsap = jest.requireActual('gsap');
  return {
    ...originalGsap,
    to: jest.fn()
  };
});

gsap.to = jest.fn();

describe('checkOverlap function', () => {
  let imageRef: MutableRefObject<HTMLImageElement | null>;
  let chars: MutableRefObject<HTMLSpanElement[] | null[]>;
  beforeEach(() => {
    imageRef = { current: document.createElement('img') };
    chars = { current: [document.createElement('span'), document.createElement('span')] };
    imageRef.current!.getBoundingClientRect = jest.fn(() => ({
      left: 100,
      right: 200,
      top: 0,
      bottom: 50,
      width: 100,
      height: 50,
      x: 100,
      y: 0,
      toJSON: () => {}
    }));
    chars.current[0]!.getBoundingClientRect = jest.fn(() => ({
      left: 150,
      right: 180,
      top: 0,
      bottom: 20,
      width: 30,
      height: 20,
      x: 150,
      y: 0,
      toJSON: () => {}
    }));
    chars.current[1]!.getBoundingClientRect = jest.fn(() => ({
      left: 210,
      right: 250,
      top: 0,
      bottom: 20,
      width: 40,
      height: 20,
      x: 210,
      y: 0,
      toJSON: () => {}
    }));
  });
  it('should apply black color when overlapping and white color when not overlapping', () => {
    checkOverlap(imageRef, chars);
    expect(gsap.to).toHaveBeenCalledTimes(2);
    expect(gsap.to).toHaveBeenNthCalledWith(1, chars.current[0], {
      color: 'black',
      duration: 1.5
    });
    expect(gsap.to).toHaveBeenNthCalledWith(2, chars.current[1], {
      color: 'black',
      duration: 1.5
    });
  });
});
