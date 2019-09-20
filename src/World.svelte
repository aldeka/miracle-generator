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
  import { generateMiracle } from './drawings/Miracle';
  import { generateBeing } from './drawings/Being';
  import { getRandomItem } from './drawings/utils';

  const getColorId = () => {
    // prefer colors that aren't currently on the screen
    const usedColors = trails.map(trail => config.colors(trail.colorId));
    let options = new Array(config.colorChoices.length);
    let rawColorId;
    const diff = options
      .map((x, i) => i)
      .filter((x, i) => !usedColors.includes(i));
    if (diff.length > 0) {
      rawColorId = getRandomItem(diff).item;
    }
    rawColorId = getRandomItem(config.colorChoices).index;

    // multiplication is to normalize distribution
    // in case the user switches color schemes
    // since they have different numbers of choices
    // (the color getter function modulos them for you)
    return rawColorId + getRandomItem([0, 1, 2]).item * config.colorChoices.length;
  };

  let canvas;
  let world;
  let canvasDimensions = {};
  const scale = window.devicePixelRatio;

  function init() {
    canvas = document.getElementById("miraculous-world");
    if (canvas && canvas.getContext) {
      world = canvas.getContext('2d');
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
    } else {
      // canvas-unsupported code here
      console.error("oh no canvas is missing or doesn't work here");
      return false;
    }
    return true;
  }

  function getCollision(b, otherBeings, trailWidth) {
    let result = {
      isColliding: false,
      otherBeingIndex: -1,
      collision: {
        x: 0,
        y: 0,
      },
    };

    for (let i = 0; i < otherBeings.length; i++) {
      const b2 = otherBeings[i];
      if (!b2.trail) {
        continue;
      }
      const distance = Math.hypot(b2.trail.end.x - b.trail.end.x, b2.trail.end.y - b.trail.end.y);
      if (distance < trailWidth / 2) {
        result.isColliding = true;
        result.otherBeingIndex = i;
        result.collision = { ...b.trail.end };
        result.collision = {
          x: b.trail.end.x + (b2.trail.end.x - b.trail.end.x) / 2,
          y: b.trail.end.y + (b2.trail.end.y - b.trail.end.y) / 2,
        }
        break;
      }
    }

    return result;
  }

  function draw() {
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
    world.clearRect(0, 0, canvas.width, canvas.height);

    // draw children
    let trailsToDelete = [];
    let miraclesToDelete = [];

    // draw active trails (beings) and inactive trails
    // (stored in the same array to preserve ordering)
    trails.forEach((t, index) => {
      const result = t.draw(world, config);
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
            config.trailWidth
          );
          if (isColliding) {
            console.log('collision!', collision);
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

  onMount(() => {
    init();
    if (world) {
      window.requestAnimationFrame(draw);
      const createBeings = () => {
        const canvasRect = canvas.getBoundingClientRect();
        const worldHeight = canvasRect.height;
        const worldWidth = canvasRect.width;
        if (trails.filter(t => t.trail).length < 6) {
          const newBeingCountOptions = [];
          for (var i = 0; i < config.maxNewBeings; i++) {
            newBeingCountOptions.push(i + 1);
          }
          let newBeingCount = getRandomItem(newBeingCountOptions).item;
          while (newBeingCount > 0) {
            const b = generateBeing(getColorId(), worldWidth, worldHeight, config);
            addTrail(b);
            newBeingCount -= 1;
          }
        }
      };
      const birthInterval = setInterval(createBeings, 2000);
      return () => clearInterval(birthInterval);
    }
  });
</script>

<canvas id="miraculous-world" style={`background: ${config.darkMode ? '#090909' : 'white'}`}>
</canvas>