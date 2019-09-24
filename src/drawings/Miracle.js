const drawHeart = (context, pos, colorStroke, colorFill, transparency) => {
  context.save();
  const scale = 0.3;
  context.globalAlpha = transparency;
  context.lineWidth = 24;
  context.lineJoin = 'bevel';
  context.strokeStyle = colorStroke;
  context.fillStyle = colorFill;
  context.beginPath();
  context.translate(pos.x - 75 * scale, pos.y - 60 * scale);
  context.scale(scale, scale);
  context.bezierCurveTo(75, 37, 70, 25, 50, 25);
  context.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
  context.bezierCurveTo(20, 80, 40, 102, 75, 120);
  context.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
  context.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
  context.bezierCurveTo(85, 25, 75, 37, 75, 40);
  context.stroke();
  context.fill();
  context.restore();
};

let id = 1;

const generateMiracle = (pos, color1, color2) => {
  const myID = id;
  id += 1;
  // reset so we don't have to deal with giant numbers
  if (id > 1000) id = 1;

  let isFaded = false;
  const draw = (context, config, { createdAt }) => {
    let transparency = config.transparency;
    if (createdAt !== 0) {
      transparency = Math.max(1 - ((Date.now() - createdAt) / 1000) / (config.fadeTime * 16), 0);
      if (!config.mortalMiracles && transparency < config.transparency / 2) {
        transparency = config.transparency / 2;
      }
      if (transparency <= 0) {
        isFaded = true;
      }
    }
    drawHeart(
      context,
      pos,
      config.colors(color1),
      config.colors(color2),
      transparency
    );
  };

  return {
    id: myID,
    draw,
    isFaded,
    createdAt: new Date(),
  };
}

export {
  generateMiracle,
};