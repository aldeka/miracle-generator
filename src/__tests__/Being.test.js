import { getStart, getVector } from '../drawings/Being';

describe('Being', () => {
  const worldWidth = 900;
  const worldHeight = 600;
  const trailWidth = 12;

  describe('getStart', () => {
    it('always puts one of x or y off the edge of the canvas', () => {
      let tries = 5;
      while (tries > 0) {
        const result = getStart(worldWidth, worldHeight, trailWidth);
        expect(
          result.x < 0 ||
          result.y < 0 ||
          result.x > worldWidth ||
          result.y > worldHeight
        ).toBe(true);
        tries -= 1;
      }
    });
  });

  describe('getVector', () => {
    it('sets the dx and dy values so the hypotenuse is 1', () => {
      const start = {
        x: -12,
        y: 300,
      };
      let tries = 5;
      while (tries > 0) {
        const result = getVector(start, worldWidth, worldHeight);
        expect(Math.abs(1 - Math.abs(Math.pow(result.dx, 2) + Math.pow(result.dy, 2)))).toBeLessThan(0.00001);
        tries -= 1;
      }
    });

    it('sets the slope so that the being will be visible on the canvas', () => {
      let start = {
        x: -12,
        y: worldHeight / 8,
      };
      let result = getVector(start, worldWidth, worldHeight);
      expect(result.dx).toBeGreaterThan(0);
      expect(result.dx).toBeLessThan(0.8);
      expect(result.dx).toBeGreaterThanOrEqual(0.2);
      expect(result.dy).toBeGreaterThanOrEqual(0.6);
      expect(result.dy).toBeLessThan(0.98);

      start = {
        x: 912,
        y: worldHeight * 7/8,
      };
      result = getVector(start, worldWidth, worldHeight);
      expect(result.dx).toBeLessThan(0);
      expect(result.dx).toBeGreaterThan(-0.8);
      expect(result.dx).toBeLessThanOrEqual(-0.2);

      start = {
        x: 12,
        y: -12,
      };
      result = getVector(start, worldWidth, worldHeight);
      expect(result.dy).toBeGreaterThan(0);
      expect(result.dx).toBeGreaterThan(0);
      expect(result.dx).toBeGreaterThanOrEqual(0.2);
      expect(result.dx).toBeLessThan(0.8);

      start = {
        x: 12,
        y: 612,
      };
      result = getVector(start, worldWidth, worldHeight);
      expect(result.dy).toBeLessThan(0);
      expect(result.dx).toBeGreaterThan(0);
      expect(result.dx).toBeGreaterThanOrEqual(0.2);
      expect(result.dx).toBeLessThan(0.8);
    });
  });
});