import { getRandomItem, getRandomRange } from './utils';

export const getStart = (worldWidth, worldHeight, trailWidth) => {
  let prospectiveX = Math.floor(Math.random() * (worldWidth + trailWidth));
  let prospectiveY = Math.floor(Math.random() * (worldHeight + trailWidth));
  if (getRandomItem(['x', 'y']).index === 0) {
    prospectiveX = getRandomItem([-trailWidth, worldWidth + trailWidth]).item;
  } else {
    prospectiveY = getRandomItem([-trailWidth, worldHeight + trailWidth]).item;
  }
  return {
    x: prospectiveX,
    y: prospectiveY,
  };
};

export const getVector = (start, worldWidth, worldHeight, trailWidth) => {
  let xMultiplier = getRandomItem([-1, 1]).item;
  let yMultiplier = getRandomItem([-1, 1]).item;

  if (start.x >= worldWidth * 2/3) {
    xMultiplier = -1;
  }
  if (start.y >= worldHeight * 2/3) {
    yMultiplier = -1;
  }
  if (start.x <= worldWidth * 1/3) {
    xMultiplier = 1;
  }
  if (start.y <= worldHeight * 1/3) {
    yMultiplier = 1;
  }
  let maxDx = 0.80;
  let minDx = 0.20;
  if ((worldWidth / 8 < start.x && start.x < worldWidth * 7 / 8) ||
    (worldHeight / 8 < start.y && start.y < worldHeight * 7 / 8)
  ) {
    maxDx = 1.00;
    minDx = 0.00;
  }
  const rawDx = getRandomRange(maxDx, minDx);
  const rawDy = Math.sqrt(1 - Math.pow(rawDx, 2));

  return {
    dx: rawDx * xMultiplier,
    dy: rawDy * yMultiplier,
  };
};

let id = 1;

export const generateBeing = (colorId, worldWidth, worldHeight, config) => {
  const myID = id;
  id += 1;
  // reset so we don't have to deal with giant numbers
  if (id > 1000) id = 1;

  const start = getStart(worldWidth, worldHeight, config.trailWidth);
  if (typeof(start.x) !== 'number' || typeof(start.y) !== 'number') {
    // freak out
    throw(new Error(`Invalid start ${start.x}, ${start.y} ${typeof(start.x)}`))
  }
  const vector = getVector(start, worldWidth, worldHeight, config.trailWidth);
  if (typeof(vector.dx) !== 'number' || typeof(vector.dy) !== 'number') {
    // freak out
    throw(new Error(`Invalid vector ${vector.dx}, ${vector.dy} ${typeof(vector.dx)}`))
  }
  const trail = {
    id,
    colorId,
    start,
    end: start,
    vector,
    length: 0,
    doneAt: 0,
  };

  let pos = { ...start };
  let hasStarted = false;

  const advancePosition = (speed) => {
    pos.x += vector.dx * speed;
    pos.y += vector.dy * speed;
    return pos;
  }

  const drawTrail = (context, config, { start, colorId, length, vector, doneAt }) => {
    // draw trail
    context.save();
    let isFaded = false;
    if (doneAt === 0) {
      context.globalAlpha = config.transparency;
    } else {
      context.globalAlpha = Math.max(config.transparency - (config.transparency * ((Date.now() - doneAt) / 1000) / config.fadeTime), 0);
      if (context.globalAlpha <= 0) {
        isFaded = true;
      }
    }
    context.fillStyle = config.colors(colorId);
    context.translate(start.x, start.y);
    context.rotate(Math.atan(vector.dy / vector.dx) - Math.PI / 2);
    if (vector.dx < 0) {
      context.rotate(Math.PI);
    }
    context.fillRect(-config.trailWidth / 2, -config.trailWidth / 2, config.trailWidth, length + config.trailWidth / 2);
    context.restore();
    return {
      isFaded,
    };
  }

  const draw = (context, config) => {
    if (!hasStarted) {
      hasStarted = true;
    } else {
      advancePosition(config.speed);
    }
    trail.end = pos;
    const trailLength = Math.hypot(trail.end.x - trail.start.x, trail.end.y - trail.start.y);
    trail.length = trailLength;

    drawTrail(context, config, trail);

    const radius = (9 * config.trailWidth / 16);
    context.save();
    context.beginPath();
    context.fillStyle = config.colors(trail.colorId);
    context.strokeStyle = config.darkMode ? '#090909' : 'white';
    context.strokeWidth = config.trailWidth / 8;
    context.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();
    context.restore();
    return {
      isDone: pos.x < -config.trailWidth * 2 ||
        pos.x > worldWidth + config.trailWidth * 2 ||
        pos.y < -config.trailWidth * 2 ||
        pos.y > worldHeight + config.trailWidth * 2,
      trail,
    };
  }

  return {
    id: myID,
    vector,
    start,
    colorId,
    trail,
    draw,
    drawTrail,
    hasCollided: false,
  };
};
