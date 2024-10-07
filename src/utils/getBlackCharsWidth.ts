import { MutableRefObject } from 'react';

export const getBlackCharsWidth = (
  ref1: MutableRefObject<HTMLSpanElement[] | null[]>,
  blackCharsCount: number,
  ref2: MutableRefObject<HTMLSpanElement[] | null[]>
) => {
  let totalWidthOfTheFirstNameBlackChars = 0;
  let totalWidthOfTheSecondNameBlackChars = 0;
  const charsOfFirstName = ref1.current;
  const charsOfSecondName = ref2.current;
  for (
    let i = charsOfFirstName.length - 1;
    i >= Math.max(charsOfFirstName.length - blackCharsCount, 0);
    i--
  ) {
    const char = charsOfFirstName[i];
    if (char) {
      const charWidth = char.getBoundingClientRect().width;
      totalWidthOfTheFirstNameBlackChars += charWidth;
    }
  }
  for (let i = 0; i < blackCharsCount; i++) {
    const char = charsOfSecondName[i];
    if (char) {
      const charWidth = char.getBoundingClientRect().width;
      totalWidthOfTheSecondNameBlackChars += charWidth;
    }
  }
  return { totalWidthOfTheFirstNameBlackChars, totalWidthOfTheSecondNameBlackChars };
};
