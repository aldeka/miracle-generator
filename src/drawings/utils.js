export const getRandomItem = (collection) => {
  const index = Math.floor(Math.random() * collection.length);
  return {
    item: collection[index],
    index,
  };
};

export const getRandomRange = (max, min = 0) => {
  const val = Math.random() * (max - min) + min;
  const valString = val.toString();
  return val.toPrecision(valString.indexOf('.') !== -1 ? 2 : valString.length);
};