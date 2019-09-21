<style>
  a {
    color: #ac00ac;
  }
  a:hover {
    color: fuchsia;
  }
  .about-section {
    position: absolute;
    bottom: 0;
    left: 8px;
    box-sizing: border-box;
  }
  .hidden {
    bottom: calc(-100vh + 8px);
  }
  .about {
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

  .about.dark {
    color: rgba(255, 255, 255, 0.8);
  }
  .about.light {
    color: rgba(0, 0, 0, 0.8);
  }

  h4 {
    margin: 4px 0 16px;
  }

  .about p {
    line-height: 1.5;
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
    right: left;
    height: 27px;
    border: none;
    padding: 4px;
    border-radius: 0;
    font-weight: 200;
  }

  .nav-toggle.x {
    top: 0;
    right: 0;
    height: 36px;
    width: 32px;
    font-size: 24px;
    line-height: 24px;
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
  export let darkMode;
  let hidden = true;
  const toggleAbout = () => {
    hidden = !hidden;
  };
</script>

<div class={`about-section ${hidden ? "hidden" : ""}`}>
  <button
    role="button"
    class={`nav-toggle ${darkMode ? "dark" : "light"} ${hidden ? "" : "x"}`}
    on:click={toggleAbout}
  >
    {@html hidden ? "about" : "&times;" }
  </button>
  <div class={`about ${darkMode ? "dark" : "light"}`}>
    <h4>About</h4>
    <p>
      Miracle Generator is a web art project by <a href="https://aldeka.net">Karen Rustad Tölva</a>. Inspired by
      <a href="http://halliebateman.com/project/865/">Hallie Bateman's "It's a miracle we ever met"</a>.
    </p>
    <p>
      <a href="https://github.com/aldeka/miracle-generator">Source code here</a>.
    </p>
    <p>
      Sound effects licensed CC-BY by <a href="https://freesound.org/people/juskiddink/packs/5069/">juskiddink</a>.
    </p>
  </div>
</div>