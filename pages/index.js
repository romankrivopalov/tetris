import * as all from '../utils/constants.js'

import Game from '../components/Game.js';
import View from '../components/View.js'

const game = new Game(all.gameSetting);
const view = new View(all.viewSetting);

view.render(game.getState());

window.game = game;
window.view = view;

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowLeft': // налево
      game.movePieceLeft();
      view.render(game.getState());
      break;
    case 'ArrowUp': // налево
      game.rotatePiece();
      view.render(game.getState());
      break;
    case 'ArrowRight': // налево
      game.movePieceRight();
      view.render(game.getState());
      break;
    case 'ArrowDown': // налево
      game.movePieceDown();
      view.render(game.getState());
      break;
  }
})
