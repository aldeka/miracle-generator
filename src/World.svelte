<style>
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100vw - 16px);
    height: calc(100vh - 16px);
    border: 8px solid black;
  }
</style>

<script>
  export let config;
  export let miracles;
  export let trails;
  export let addTrail;
  export let addMiracle;
  export let removeBeing;
  export let removeTrails;
  export let removeMiracles;

  import { onMount } from 'svelte';
  import playSound, { BELLS } from './bells';
  import getCollision from './collisions';
  import getColorId from './colors';
  import { generateMiracle } from './drawings/Miracle';
  import { generateBeing } from './drawings/Being';
  import { getRandomItem } from './drawings/utils';

  let canvas;
  let world;
  let canvasDimensions = {};
  const scale = window.devicePixelRatio;

  function sizeCanvas() {
    const newCanvasDimensions = canvas.getBoundingClientRect();
    if (
      newCanvasDimensions.width !== canvasDimensions.width ||
      newCanvasDimensions.height !== canvasDimensions.height
    ) {
      canvasDimensions = newCanvasDimensions;
      canvas.width = canvasDimensions.width * scale;
      canvas.height = canvasDimensions.height * scale;
      world.scale(scale, scale);
    }
  }

  function init() {
    canvas = document.getElementById("miraculous-world");
    if (canvas && canvas.getContext) {
      world = canvas.getContext('2d');
      sizeCanvas();
    } else {
      // canvas-unsupported code here
      console.error("oh no canvas is missing or doesn't work here");
      return false;
    }
    return true;
  }

  function checkForMiracles(t, index) {
    if (t.trail) {
      if (t.trail.end.x > 0 &&
        t.trail.end.x < canvas.width &&
        t.trail.end.y > 0 &&
        t.trail.end.y < canvas.height
      ) {
        const {
          isColliding,
          otherBeingIndex,
          collision
        } = getCollision(
          t,
          trails.slice(0, Math.max(0, index)),
          config.trailWidth,
        );
        if (isColliding) {
          const bellId = getRandomItem(Object.keys(BELLS)).item;
          console.log('a miracle occurred!', `${t.id}/${trails[otherBeingIndex].id}/${config.colors(t.trail.colorId)}/${config.colors(trails[otherBeingIndex].trail.colorId)} ${bellId}`);
          if (config.allowSound) {
            playSound(bellId);
          }
          removeBeing(t, index);
          removeBeing(trails[otherBeingIndex], otherBeingIndex);
          addMiracle(
            generateMiracle(
              collision,
              t.colorId,
              trails[otherBeingIndex].colorId
            )
          );
        }
      }
    }
  }


  function draw() {
    sizeCanvas();
    world.clearRect(0, 0, canvas.width, canvas.height);

    // draw children
    let trailsToDelete = [];
    let miraclesToDelete = [];

    // draw active trails (beings) and inactive trails
    // (stored in the same array to preserve ordering)
    trails.forEach((t, index) => {
      const result = t.draw(world, config);
      checkForMiracles(t, index);
      if (result && result.isDone && t.trail) {
        removeBeing(t, index);
      }
      if (result && result.isFaded) {
        trailsToDelete.push(t.id);
      }
    });

    // draw miracles on top
    miracles.forEach(m => {
      const result = m.draw(world, config, m);
      if (result && result.isFaded) {
        // delete miracle
        miraclesToDelete.push(m.id);
      }
    });

    // delete defunct trails
    if (trailsToDelete.length > 0) {
      removeTrails(trailsToDelete);
      trailsToDelete = [];
    }

    // delete defunct miracles
    if (miraclesToDelete.length > 0) {
      removeMiracles(miraclesToDelete);
      miraclesToDelete = [];
    }

    window.requestAnimationFrame(draw);
  }

  function createBeings() {
    if (trails.filter(t => t.trail).length < 6) {
      const newBeingCountOptions = [];
      for (var i = 0; i < config.maxNewBeings; i++) {
        newBeingCountOptions.push(i + 1);
      }
      let newBeingCount = getRandomItem(newBeingCountOptions).item;
      while (newBeingCount > 0) {
        const b = generateBeing(getColorId(trails, config), canvasDimensions.width, canvasDimensions.height, config);
        addTrail(b);
        newBeingCount -= 1;
      }
    }
  }

  onMount(() => {
    init();
    if (world) {
      window.requestAnimationFrame(draw);
      const birthInterval = setInterval(createBeings, 2000);
      return () => clearInterval(birthInterval);
    }
  });
</script>

<canvas id="miraculous-world" style={`background: ${config.darkMode ? '#090909' : 'white'}`}>
</canvas>
