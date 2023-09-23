class Game {
  // объект активной фигуры
  activePiece = {
    x: 0,
    y: 0,
    // геттер для обращения к ещё неопределенным значениям
    // метод возвращает фигуры, соответствующую индексу
    get blocks() {
      return this.rotations[this.rotationIndex];
    },
    rotationIndex: 0,
    rotations: [
      [
        [0,1,0],
        [1,1,1],
        [0,0,0],
      ],
      [
        [0,1,0],
        [0,1,1],
        [0,1,0],
      ],
      [
        [0,0,0],
        [1,1,1],
        [0,1,0],
      ],
      [
        [0,1,0],
        [1,1,0],
        [0,1,0],
      ],
    ]
  };

  constructor(setting) {
    this._setting = setting;
    this._score = this._setting.score;
    this._lines = this._setting.lines;
    this._level = this._setting.level;
    // поле имеет размер 20х10
    this._playfield = this._setting.playfield;
  };

  // движение фигуры налево
  movePieceLeft() {
    this.activePiece.x -= 1;

    // если перемещение фигуры было на несуществующую позицию, возвращаем её обратно
    if (this.hasCollision()) this.activePiece.x += 1;
  };

  // движение фигуры направо
  movePieceRight() {
    this.activePiece.x += 1;

    if (this.hasCollision()) this.activePiece.x -= 1;
  };

  // движение фигуры вниз
  movePieceDown() {
    this.activePiece.y += 1;

    if (this.hasCollision()) {
      this.activePiece.y -= 1;
      // если фигура дошла до низа или столкнулась с другой фигурой, фиксируем её
      this.lockPiece();
    }
  };

  rotatePiece() {
    // изменение индекса при повороте фигуры
    this.activePiece.rotationIndex = (this.activePiece.rotationIndex + 1) % 4;

    if (this.hasCollision()) {
      this.activePiece.rotationIndex = (4 - (this.activePiece.rotationIndex + 1)) % 4;
    }

    return this.activePiece;
  }

  // проверка выходит ли фигура за границы поля
  hasCollision() {
    const { y: pieceY, x: pieceX, blocks } = this.activePiece;

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (
          // проверка наличия блока в фигуре, например смещать фигуру вниз, если в блоке нижний ряд все нули
          blocks[y][x] &&
          // проверка расположения блока в пределах игрового поля
          ((this._playfield[pieceY + y] === undefined || this._playfield[pieceY + y][pieceX + x] === undefined) ||
          // проверка свободного места в игровом поле, столкновение фигур
          this._playfield[pieceY + y][pieceX + x])
        ) {
          return true
        }
      }
    }

    // если обратиться к несуществующему индексу
    return false
  }

  // зафиксировать положение фигуры
  lockPiece() {
    const { y: pieceY, x: pieceX, blocks } = this.activePiece;

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        // если блок не пустая ячейка
        if (blocks[y][x]) {
          this._playfield[pieceY + y][pieceX + x] = blocks[y][x];
        }
      }
    }
  }
}

export default Game
