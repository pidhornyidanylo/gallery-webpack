import { getBlackCharsWidth } from './getBlackCharsWidth';

describe('getBlackCharsWidth function', () => {
  it('works predictably', () => {
    const firstName = 'Johnny';
    const firstNameArray = [];
    for (const s of firstName) {
      const spanElement = document.createElement('span');
      spanElement.textContent = s;
      firstNameArray.push(spanElement);
    }
    const secondName = 'Knoxville';
    const secondNameArray = [];
    for (const s of secondName) {
      const spanElement = document.createElement('span');
      spanElement.textContent = s;
      secondNameArray.push(spanElement);
    }
    const result = getBlackCharsWidth(firstNameArray, secondNameArray);
    expect(result.totalWidthOfTheFirstNameBlackChars).not.toBeNaN();
    expect(result.totalWidthOfTheSecondNameBlackChars).not.toBeNaN();
  });
});
