class Controller {
  constructor(game, view) {
    this._game = game;
    this._view = view;
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleKeyUp = this._handleKeyUp.bind(this);
    this._intervalId = null;
    this._isPlaying = false;

    document.addEventListener('keydown', this._handleKeyDown);
    document.addEventListener('keyup', this._handleKeyUp);

    this._view.renderStartScreen();
  }

  _updeteView = () => {
    const state = this._game.getState();

    // если игра закончена
    if (state.isGameOver) {
      this._view.renderEndScreen(state);
    // если включена пауза
    } else if (!this._isPlaying) {
      this._view.renderPauseScreen();
    // показать экран игры
    } else {
      this._view.renderMainScreen(state);
    }
  }

  // остановить таймер
  _stopTimer = () => {
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
  }

  // запустить таймер
  _startTimer = () => {
    // уменьшение времени при изменении уровня
    const speed = 1000 - this._game.getState().level * 100;

    if (!this._intervalId) {
      // сохранение интервала для его дальнейшей остановки
      this._intervalId = setInterval(() => {
        this._update();
      }, speed > 0 ? speed : 100);
    }
  }

  _update = () => {
    this._game.movePieceDown();
    this._updeteView();
  }

  _reset = () => {
    this._game.reset();
    this._play();
  }

  _pause = () => {
    this._isPlaying = false;
    this._stopTimer();
    this._updeteView();
  }

  _play = () => {
    this._isPlaying = true;
    this._startTimer();
    this._updeteView();
  }

  _handleKeyUp = (e) => {
    switch (e.key) {
      case 'ArrowDown': // вниз
        this._startTimer();

        break;
    }
  }

  _handleKeyDown = (e) => {
    const state = this._game.getState();

    switch (e.key) {
      case 'Enter':
        if (state.isGameOver) {
          this._reset();
        } else if (this._isPlaying) {
          this._pause();
        } else {
          this._play();
        }
        break;
      case 'ArrowLeft': // налево
        if (this._isPlaying) {
          this._game.movePieceLeft();
          this._updeteView();
        }
        break;
      case 'ArrowUp': // вверх
        if (this._isPlaying) {
          this._game.rotatePiece();
          this._updeteView();
        }
        break;
      case 'ArrowRight': // направо
        if (this._isPlaying) {
          this._game.movePieceRight();
          this._updeteView();
        }
        break;
      case 'ArrowDown': // вниз
        if (this._isPlaying) {
          this._stopTimer();
          this._game.movePieceDown();
          this._updeteView();
        }
        break;
    }
  }
}

export default Controller
