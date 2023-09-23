import * as all from '../utils/constants.js'

import Game from '../components/Game.js';

const game = new Game(all.gameSetting);

window.game = game;

console.log(game)
