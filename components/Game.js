class Game {
  constructor(setting) {
    this._setting = setting;
    // объект активной фигуры
    this.activePiece = this._createPiece();
    // объект следующей фигуры
    this.nextPiece = this._createPiece();
    this._score = this._setting.score;
    this._lines = this._setting.lines;
    this._level = this._setting.level;
    // поле имеет размер 20х10
    this.playfield = this.createPlayField(); // * заменить на значение createPlayField
  };

  // движение фигуры налево
  movePieceLeft = () => {
    this.activePiece.x -= 1;

    // если перемещение фигуры было на несуществующую позицию, возвращаем её обратно
    if (this.hasCollision()) this.activePiece.x += 1;
  };

  // движение фигуры направо
  movePieceRight = () => {
    this.activePiece.x += 1;

    if (this.hasCollision()) this.activePiece.x -= 1;
  };

  // движение фигуры вниз
  movePieceDown = () => {
    this.activePiece.y += 1;

    if (this.hasCollision()) {
      this.activePiece.y -= 1;
      // если фигура дошла до низа или столкнулась с другой фигурой, фиксируем её
      this.lockPiece();

      this._updatePieces();
    }
  };

  rotatePiece = () => {
    // изменение индекса при повороте фигуры
    this.activePiece.rotationIndex = (this.activePiece.rotationIndex + 1) % 4;

    if (this.hasCollision()) {
      this.activePiece.rotationIndex = (4 - (this.activePiece.rotationIndex + 1)) % 4;
    }

    return this.activePiece;
  }

  // проверка выходит ли фигура за границы поля
  hasCollision = () => {
    const { y: pieceY, x: pieceX, blocks } = this.activePiece;

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (
          // проверка наличия блока в фигуре, например смещать фигуру вниз, если в блоке нижний ряд все нули
          blocks[y][x] &&
          // проверка расположения блока в пределах игрового поля
          ((this.playfield[pieceY + y] === undefined || this.playfield[pieceY + y][pieceX + x] === undefined) ||
          // проверка свободного места в игровом поле, столкновение фигур
          this.playfield[pieceY + y][pieceX + x])
        ) {
          return true
        }
      }
    }

    // если обратиться к несуществующему индексу
    return false
  }

  // зафиксировать положение фигуры
  lockPiece = () => {
    const { y: pieceY, x: pieceX, blocks } = this.activePiece;

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        // если блок не пустая ячейка
        if (blocks[y][x]) {
          this.playfield[pieceY + y][pieceX + x] = blocks[y][x];
        }
      }
    }
  }

  _updatePieces = () => {
    this.activePiece = this.nextPiece;
    this.nextPiece = this._createPiece();
  }

  // создание фигуры
  _createPiece = () => {
    // случайное значение от 0 до 6
    const index = Math.floor(Math.random() * 7);
    // строка, символ каждой буквы обозначают фигуру
    const type = 'IJLOSTZ'[index];
    const piece = {
      // геттер для обращения к ещё неопределенным значениям
      // метод возвращает фигуры, соответствующую индексу
      get blocks() {
        return this.rotations[this.rotationIndex];
      },
      rotationIndex: 0,
    };

    switch (type) {
      case 'I':
        piece.rotations = this._setting.pieceRotationsI;
        break;
      case 'J':
        piece.rotations = this._setting.pieceRotationsJ;
        break;
      case 'L':
        piece.rotations = this._setting.pieceRotationsL;
        break;
      case 'O':
        piece.rotations = this._setting.pieceRotationsO;
        break;
      case 'S':
        piece.rotations = this._setting.pieceRotationsS;
        break;
      case 'T':
        piece.rotations = this._setting.pieceRotationsT;
        break;
      case 'Z':
        piece.rotations = this._setting.pieceRotationsZ;
        break;
      default:
        throw new Error('unknown shape type');
    }

    // установка появления фигуры по центру
    piece.x = Math.floor((10 - piece.rotations[0].length) / 2);
    piece.y = 0;

    return piece;
  }

  createPlayField = () => {
    const playfield = [];

    for (let y = 0; y < 20; y++) {
      playfield[y] = [];

      for (let x = 0; x < 10; x++) {
        playfield[y][x] = 0;
      }
    }

    return playfield;
  }

  getState = () => {
    const playfield = this.createPlayField();
    const { y: pieceY, x: pieceX, blocks } = this.activePiece;

    for (let y = 0; y < this.playfield.length; y++) {
      playfield[y] = [];

      for (let x = 0; x < this.playfield[y].length; x++) {
        playfield[y][x] = this.playfield[y][x];
      }
    }

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (blocks[y][x]) {
          playfield[pieceY + y][pieceX + x] = blocks[y][x];
        }
      }
    }

    return {
      playfield
    }
  }
}

export default Game
