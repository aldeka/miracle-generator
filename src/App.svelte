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
  import About from './About.svelte';
  import constants from './constants';

  const colorsGetter = colorChoices => ((id) => {
    const adjustedId = id % colorChoices.length;
    return colorChoices[adjustedId];
  });

  let miracles = [];
  let trails = [];

  let config = {
    darkMode: false,
    trailWidth: constants.TRAIL_WIDTH,
    speed: constants.SPEED,
    transparency: constants.DEFAULT_TRANSPARENCY,
    mortalMiracles: false,
    fadeTime: constants.FADE_TIME,
    colorset: 'DEFAULT',
    colors: colorsGetter(constants.COLOR_OPTIONS.DEFAULT),
    colorChoices: constants.COLOR_OPTIONS.DEFAULT,
    maxNewBeings: constants.MAX_NEW_BEINGS,
    maxActiveBeings: constants.MAX_NEW_BEINGS * 2 - 1,
    allowSound: true,
  };

  const addMiracle = m => miracles.push(m);
  const addTrail = t => trails.push(t);

  const removeBeing = (b, index) => {
    const trail = {
      ...b.trail,
      isDone: true,
      doneAt: new Date(),
    };
    trail.length += config.trailWidth / 4;
    const draw = (context, config) => b.drawTrail(context, config, trail);
    trail.draw = draw;
    trails[index] = trail;
  }

  const removeMiracles = (ids) => {
    miracles = miracles.filter(m => ids.indexOf(m.id) === -1);
  };
  const removeTrails = (ids) => {
    trails = trails.filter(t => ids.indexOf(t.id) === -1);
  };

  const clearMiracles = () => {
    miracles = [];
  }

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
  <World
    miracles={miracles}
    trails={trails}
    config={config}
    addMiracle={addMiracle}
    addTrail={addTrail}
    removeBeing={removeBeing}
    removeMiracles={removeMiracles}
    removeTrails={removeTrails}
  />
  <About darkMode={config.darkMode} />
  <Options
    config={config}
    setConfig={setConfig}
    clearMiracles={clearMiracles}
  />
</div>
