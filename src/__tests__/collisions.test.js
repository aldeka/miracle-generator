import getCollision from '../collisions';

describe('getCollision', () => {
  const trailWidth = 16;
  const radius = trailWidth / 2;
  const being = {
    trail: {
      end: {
        x: 100,
        y: 100,
      },
    },
  };

  test('no collision if only one item', () => {
    const result = getCollision(being, [], trailWidth);
    expect(result.isColliding).toBe(false);
    expect(result.otherBeingIndex).toBe(-1);
  });

  test('no collision if items are too far away', () => {
    const otherBeings = [
      {
        trail: {
          end: {
            x: 20,
            y: 21,
          },
        },
      },
      {
        trail: {
          end: {
            x: 26,
            y: 22,
          },
        },
      },
    ];
    const result = getCollision(being, otherBeings, trailWidth);
    expect(result.isColliding).toBe(false);
  });

  test('returns collision if within two radii of each other', () => {
    const otherBeings = [
      {
        trail: {
          end: {
            x: being.trail.end.x + (radius * 2) - 2.01,
            y: 100,
          },
        },
      },
    ];

    const result = getCollision(being, otherBeings, trailWidth);
    expect(result.isColliding).toBe(true);
    expect(result.otherBeingIndex).toEqual(0);
    expect(result.collision.x).toEqual(being.trail.end.x + radius - 1.005);
    expect(result.collision.y).toEqual(100);
  });

  test('ignores inactive trails', () => {
    const otherBeings = [
      {
        end: {
          x: 101,
          y: 101,
        },
      },
    ];

    const result = getCollision(being, otherBeings, trailWidth);
    expect(result.isColliding).toBe(false);
  });

  test('returns collision even if one has float coordinates', () => {
    const otherBeings = [
      {
        trail: {
          end: {
            x: 105.7,
            y: 100.00002,
          },
        },
      },
    ];

    const result = getCollision(being, otherBeings, trailWidth);
    expect(result.isColliding).toBe(true);
  });

  test('returns the first other item that collides', () => {
    const otherBeings = [
      {
        trail: {
          end: {
            x: being.trail.end.x + 9.5,
            y: being.trail.end.y + 9.5,
          },
        },
      },
      {
        trail: {
          end: {
            x: 95,
            y: 95,
          },
        },
      },
    ];

    const result = getCollision(being, otherBeings, trailWidth);
    expect(result.isColliding).toBe(true);
    expect(result.collision.x).toBe(104.75);
    expect(result.collision.y).toBe(104.75);
  });
});