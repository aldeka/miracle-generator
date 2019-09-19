<style>
  #container {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    padding: 0;
    margin: 0;
  }
</style>

<script>
  import World from './World.svelte';
  import Options from './Options.svelte';
  import constants from './constants';

  // const configOptions = {
  //   trailWidth: [12, constants.TRAIL_WIDTH, 24, 36],
  //   speed: [2, 3, constants.SPEED, 5, 6],
  //   colorChoices: Object.keys(constants.COLOR_OPTIONS),
  //   maxNewBeings: [constants.MAX_NEW_BEINGS, 4, 5, 6],
  //   fadeTime: [3, constants.FADE_TIME, 30, 120],
  // };

  const colorsGetter = colorChoices => ((id) => {
    const adjustedId = id % colorChoices.length;
    return colorChoices[adjustedId];
  });

  let config = {
    darkMode: false,
    trailWidth: constants.TRAIL_WIDTH,
    speed: constants.SPEED,
    transparency: constants.DEFAULT_TRANSPARENCY,
    fadeTime: constants.FADE_TIME,
    colorset: 'DEFAULT',
    colors: colorsGetter(constants.COLOR_OPTIONS.DEFAULT),
    colorChoices: constants.COLOR_OPTIONS.DEFAULT,
    maxNewBeings: constants.MAX_NEW_BEINGS,
    maxActiveBeings: constants.MAX_NEW_BEINGS * 2 - 1,
  };

  const setConfig = (field, value) => {
    config[field] = value;
    if (field === 'colorset') {
      config.colorset = value;
      config.colorChoices = constants.COLOR_OPTIONS[value];
      config.colors = colorsGetter(config.colorChoices);
    }
    if (field === 'maxNewBeings') {
      maxActiveBeings = value * 2 - 1;
    }
    config = {...config};
  };
</script>

<div id="container">
  <World config={config} />
  <Options config={config} setConfig={setConfig} />
</div>
