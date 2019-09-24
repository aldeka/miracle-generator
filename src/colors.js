import { getRandomItem } from './drawings/utils';

const getColorId = (currentTrails, { colorChoices, colors }) => {
  // prefer colors that aren't currently on the screen
  const usedColors = currentTrails.map(trail => (colors(trail.colorId)));
  const options = colorChoices.map((_, i) => (i));
  let rawColorId;
  const diff = options
    .filter((id) => !usedColors.includes(colors(id)));
  if (diff.length > 0) {
    rawColorId = getRandomItem(diff).item;
  } else {
    rawColorId = getRandomItem(colorChoices).index;
  }

  // multiplication is to normalize distribution
  // in case the user switches color schemes
  // since they have different numbers of choices
  // (the color getter function modulos them for you)
  return rawColorId + getRandomItem([0, 1, 2]).item * colorChoices.length;
};

export default getColorId;
