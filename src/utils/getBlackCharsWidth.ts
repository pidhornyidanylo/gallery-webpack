export const getBlackCharsWidth = (
  firstNameSpansArray: HTMLSpanElement[] | null[],
  secondNameSpansArray: HTMLSpanElement[] | null[]
) => {
  const blackCharsCount = 4;
  let totalWidthOfTheFirstNameBlackChars = 0;
  let totalWidthOfTheSecondNameBlackChars = 0;
  for (
    let i = firstNameSpansArray.length - 1;
    i >= Math.max(firstNameSpansArray.length - blackCharsCount, 0);
    i--
  ) {
    const char = firstNameSpansArray[i];
    if (char) {
      const charWidth = char.getBoundingClientRect().width;
      totalWidthOfTheFirstNameBlackChars += charWidth;
    }
  }
  for (let i = 0; i < blackCharsCount; i++) {
    const char = secondNameSpansArray[i];
    if (char) {
      const charWidth = char.getBoundingClientRect().width;
      totalWidthOfTheSecondNameBlackChars += charWidth;
    }
  }
  return { totalWidthOfTheFirstNameBlackChars, totalWidthOfTheSecondNameBlackChars };
};
