const SPEED = 3;
const TRAIL_WIDTH = 16;
const DEFAULT_TRANSPARENCY = 0.7;
const FADE_TIME = 15; // in seconds

const DEFAULT = ['sienna', 'crimson', 'maroon', 'orangered', 'darkorange', 'goldenrod', 'khaki', 'teal', 'yellowgreen', 'limegreen', 'darkseagreen', 'darkgreen', 'turquoise', 'dodgerblue', 'mediumblue', 'navy', 'indigo', 'violet', 'purple'];

export default {
  SPEED,
  TRAIL_WIDTH,
  DEFAULT_TRANSPARENCY,
  FADE_TIME,
  MAX_NEW_BEINGS: 3,
  COLOR_OPTIONS: {
    DEFAULT,
    GOOGLEY: ['red', 'yellow', 'blue', 'green'],
    WARM: ['sienna', 'crimson', 'maroon', 'orangered', 'darkorange', 'red', 'yellow', 'khaki'],
    COOL: ['teal', 'yellowgreen', 'limegreen', 'darkseagreen', 'darkgreen', 'turquoise', 'dodgerblue', 'mediumblue', 'navy', 'indigo', 'violet', 'purple'],
  }
};
