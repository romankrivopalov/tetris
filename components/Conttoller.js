class Controller {
  constructor(game, view) {
    this.game = game;
    this.view = view;
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this._intervalId = null;
    this._isPlaying = false;

    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);

    this.view.renderStartScreen();
  }

  _updeteView = () => {
    const state = this.game.getState();

    // если игра закончена
    if (state.isGameOver) {
      this.view.renderEndScreen(state);
    // если включена пауза
    } else if (!this._isPlaying) {
      this.view.renderPauseScreen();
    // показать экран игры
    } else {
      this.view.renderMainScreen(state);
    }
  }

  _stopTimer = () => {
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
  }

  _startTimer = () => {
    const speed = 1000 - this.game.getState().level * 100;

    if (!this._intervalId) {
      // сохранение интервала для его дальнейшей остановки
      this._intervalId = setInterval(() => {
        this._update();
      }, speed > 0 ? speed : 100);
    }
  }

  _reset = () => {
    this.game = game;
    this.view = view;
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this._intervalId = null;
    this._isPlaying = false;
  }

  _update = () => {
    this.game.movePieceDown();
    this._updeteView();
  }

  _reset = () => {
    this.game.reset();
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

  handleKeyUp = (e) => {
    switch (e.key) {
      case 'ArrowDown': // вниз
        this._startTimer();

        break;
    }
  }

  handleKeyDown = (e) => {
    const state = this.game.getState();

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
          this.game.movePieceLeft();
          this._updeteView();
        }

        break;
      case 'ArrowUp': // вверх
        if (this._isPlaying) {
          this.game.rotatePiece();
          this._updeteView();
        }

        break;
      case 'ArrowRight': // направо
        if (this._isPlaying) {
          this.game.movePieceRight();
          this._updeteView();
        }

        break;
      case 'ArrowDown': // вниз
        if (this._isPlaying) {
          this._stopTimer();
          this.game.movePieceDown();
          this._updeteView();
        }

        break;
    }
  }
}

export default Controller
