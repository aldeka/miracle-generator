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

  h4 {
    margin: 4px 0 16px;
  }

  button {
    cursor: pointer;
  }

  .head-label {
    margin-bottom: 8px;
  }

  .nav-toggle {
    position: absolute;
    top: -27px;
    right: 0;
    height: 27px;
    border: none;
    padding: 4px;
    margin: 0;
    border-radius: 0;
    font-weight: 200;
    opacity: 0;
  }

  .nav-toggle:hover {
    opacity: 1;
  }

  .nav-toggle.x {
    top: auto;
    bottom: 0;
    height: 48px;
    width: 32px;
    font-size: 24px;
    line-height: 24px;
    padding-bottom: 12px;
    font-weight: 100;
    background: none;
    opacity: 1;
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
  export let clearMiracles;

  // state
  let hidden = true;

  const toggleMenu = () => {
    hidden = !hidden;
  }

</script>

<div class={`menu ${hidden ? "hidden" : ""}`}>
  <button
    role="button"
    class={`nav-toggle ${config.darkMode ? "dark" : "light"} ${hidden ? "" : "x"}`}
    on:click={toggleMenu}
  >
    {@html hidden ? "options" : "&times;" }
  </button>
  <nav class={`${config.darkMode ? "dark" : "light"}`}>
    <h4>Options</h4>
    <label for="dark-mode">
      <input
        type="checkbox"
        id="dark-mode"
        checked={config.darkMode}
        on:change={() => setConfig('darkMode', !config.darkMode)}
      />
      dark mode?
    </label>

    <div class="head-label">color scheme</div>
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

    <label for="trail-width">
      size
      <input
        type="number"
        id="trail-width"
        value={config.trailWidth}
        on:change={(e) => setConfig('trailWidth', parseInt(e.target.value, 10))}
        min=12
        max=32
        step=4
      />
    </label>

    <label for="speed">
      speed
      <input
        type="number"
        id="speed"
        value={config.speed}
        on:change={(e) => setConfig('speed', parseInt(e.target.value, 10))}
        min=0
        max=8
      />
    </label>

    <label for="fade-time">
      fade time
      <input
        type="number"
        id="fade-time"
        value={config.fadeTime}
        on:change={(e) => setConfig('fadeTime', parseInt(e.target.value, 10))}
        min=5
        max=60
        step=5
      />
    </label>

    <label for="mortal-miracles">
      <input
        type="checkbox"
        id="mortal-miracles"
        checked={config.mortalMiracles}
        on:change={() => setConfig('mortalMiracles', !config.mortalMiracles)}
      />
      miracles disappear?
    </label>

    <button role="button" on:click={clearMiracles}>clear miracles</button>

    <label for="allow-sound">
      <input
        type="checkbox"
        id="allow-sound"
        checked={config.allowSound}
        on:change={() => setConfig('allowSound', !config.allowSound)}
      />
      sound?
    </label>
  </nav>
</div>
