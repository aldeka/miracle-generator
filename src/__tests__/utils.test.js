import { getRandomItem, getRandomRange } from '../drawings/utils';

describe('getRandomItem', () => {
  test('chooses one of the items given', () => {
    const choices = ['a', 'b', 'c'];
    const result = getRandomItem(choices);
    expect(choices.indexOf(result.item)).not.toEqual(-1);
    expect(choices[result.index]).toEqual(result.item);
  });
});

describe('getRandomRange', () => {
  it('starts from zero by default', () => {
    const result = getRandomRange(10);
    expect(parseFloat(result)).toBeGreaterThanOrEqual(0);
    expect(parseFloat(result)).toBeLessThan(10);
  });

  // it('has two sig figs if decimal specified', () => {
  //   const result = getRandomRange(5.0);
  //   expect(result.length).toBe(3);
  //   expect(result.indexOf('.')).toBeGreaterThan(-1);
  // });
});