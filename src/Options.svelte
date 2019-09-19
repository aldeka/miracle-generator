<style>
  .menu {
    position: absolute;
    bottom: 0;
    right: 8px;
    box-sizing: border-box;
  }
  .hidden {
    bottom: calc(-100vh + 8px);
  }
  nav {
    height: calc(100vh - 24px);
    width: 200px;
    padding: 12px;
  }
  .dark {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.5);
  }
  .light {
    background: rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.5);
  }
  button {
    position: absolute;
    top: -27px;
    right: 0;
    height: 27px;
    border: none;
    padding: 4px;
    border-radius: 0;
    font-weight: 200;
    cursor: pointer;
  }

  button.x {
    top: 0;
    height: 36px;
    width: 32px;
    font-size: 24px;
    line-height: 24px;
    font-weight: 100;
    background: none;
  }

  button.light.x:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  button.dark.x:hover {
    background: rgba(255, 255, 255, 0.1);
  }
</style>

<script>
  export let config;
  export let setConfig;

  // state
  let hidden = true;

  const toggleMenu = () => {
    hidden = !hidden;
  }

</script>

<div class={`menu ${hidden ? "hidden" : ""}`}>
  <button
    role="button"
    class={`${config.darkMode ? "dark" : "light"} ${hidden ? "" : "x"}`}
    on:click={toggleMenu}
  >
    { hidden ? "options" : "x" }
  </button>
  <nav class={`${config.darkMode ? "dark" : "light"}`}>
    <h4>Options</h4>
    <div>color scheme</div>
    <label for="DEFAULT">
      <input
        type="radio"
        name="colors"
        id="DEFAULT"
        checked={config.colorset === 'DEFAULT'}
        on:change={() => setConfig('colorset', 'DEFAULT')}
      >
      default
    </label>
    <label for="GOOGLE">
      <input
        type="radio"
        name="colors"
        id="GOOGLE"
        checked={config.colorset === 'GOOGLE'}
        on:change={() => setConfig('colorset', 'GOOGLE')}
      >
      google
    </label>
    <label for="WARM">
      <input
        type="radio"
        name="colors"
        id="WARM"
        checked={config.colorset === 'WARM'}
        on:change={() => setConfig('colorset', 'WARM')}
      >
      warm
    </label>
    <label for="COOL">
      <input
        type="radio"
        name="colors"
        id="COOL"
        checked={config.colorset === 'COOL'}
        on:change={() => setConfig('colorset', 'COOL')}
      >
      cool
    </label>

    <label for="dark-mode">
      <input
        type="checkbox"
        id="dark-mode"
        checked={config.darkMode}
        on:change={() => setConfig('darkMode', !config.darkMode)}
      />
      dark mode?
    </label>

    <label for="trail-width">
      <input
        type="number"
        id="trail-width"
        value={config.trailWidth}
        on:change={(e) => setConfig('trailWidth', parseInt(e.target.value, 10))}
        min=12
        max=48
        step=6
      />
      size
    </label>

    <label for="trail-width">
      <input
        type="number"
        id="trail-width"
        value={config.speed}
        on:change={(e) => setConfig('speed', parseInt(e.target.value, 10))}
        min=0
        max=8
      />
      speed
    </label>
  </nav>
</div>
