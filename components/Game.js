class Game {
  // объект активной фигуры
  activePiece = {
    x: 0,
    y: 0,
    blocks: [
      [0,1,0],
      [1,1,1],
      [0,0,0],
    ],
  };

  constructor(setting) {
    this._setting = setting;
    this._score = this._setting.score;
    this._lines = this._setting.lines;
    this._level = this._setting.level;
    // поле имеет размер 20х10
    this._playfield = this._setting.playfield;
  }
}

export default Game
