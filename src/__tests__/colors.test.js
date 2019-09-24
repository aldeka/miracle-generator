import getColorId from '../colors.js';
import { COLOR_OPTIONS } from '../constants.js';

describe('getColorId', () => {
  const config = {
    colorChoices: COLOR_OPTIONS.GOOGLE,
    colors: (id) => (COLOR_OPTIONS.GOOGLE[id % COLOR_OPTIONS.GOOGLE.length]),
  };

  test('No trails', () => {
    const id = getColorId([], config);
    expect(id % config.colorChoices.length).toBeGreaterThanOrEqual(0);
    expect(id % config.colorChoices.length).toBeLessThan(config.colorChoices.length);
  });

  test('All but one color', () => {
    const trails = [0, 1, 2];
    expect(trails.length).toEqual(config.colorChoices.length - 1);
    expect(config.colors(trails[1])).toEqual(config.colorChoices[1]);
    const id = getColorId(
      trails
        .map(colorId => ({
          colorId,
        })),
      config,
    );
    expect(id % config.colorChoices.length).toEqual(config.colorChoices.length - 1);
  });

  test('Every color used', () => {
    const trails = [0, 1, 2, 3];
    expect(trails.length).toEqual(config.colorChoices.length);
    const id = getColorId(
      trails
        .map(colorId => ({
          colorId,
        })),
      config);
    expect(id % config.colorChoices.length).toBeGreaterThanOrEqual(0);
    expect(id % config.colorChoices.length).toBeLessThan(config.colorChoices.length);
  });

  test('Only one choice', () => {
    const singleColorConfig = {
      colorChoices: ['blue'],
      colors: () => ('blue'),
    };
    const id = getColorId([], singleColorConfig);
    expect(id % 1).toEqual(0);
  });
});
