export default function getCollision(b, otherBeings, trailWidth) {
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
    const distance = Math.hypot(
      b2.trail.end.x - b.trail.end.x,
      b2.trail.end.y - b.trail.end.y
    );
    if (distance < trailWidth) {
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
