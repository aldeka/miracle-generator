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

const generateMiracle = (pos, color1, color2) => {
  const draw = (context, config) => {
    drawHeart(
      context,
      pos,
      config.colors(color1),
      config.colors(color2),
      config.transparency
    );
  };

  return {
    draw,
  };
}

export {
  generateMiracle,
};