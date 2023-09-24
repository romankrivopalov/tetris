import * as all from '../utils/constants.js'

// за основу написания кода, взято решение с канала
// https://www.youtube.com/@codedojo

import Game from '../components/Game.js';
import View from '../components/View.js'
import Controller from '../components/Conttoller.js';

const game = new Game(all.gameSetting);
const view = new View(all.viewSetting);
const controller = new Controller(game, view);
