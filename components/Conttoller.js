class Controller {
  constructor(game, view) {
    this.game = game;
    this.view = view;
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this._intervalId = null;
    this._isPlaying = false;

    document.addEventListener('keydown', this.handleKeyDown);

    this.view.renderStartScreen();
  }

  _updeteView = () => {
    if (!this._isPlaying) {
      this.view.renderPauseScreen();
    } else {
      this.view.renderMainScreen(this.game.getState());
    }
  }

  _stopTimer = () => {
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
  }

  _startTimer = () => {
    if (!this._intervalId) {
      // сохранение интервала для его дальнейшей остановки
      this._intervalId = setInterval(() => {
        this._update();
      }, 1000);
    }
  }

  _update = () => {
    this.game.movePieceDown();
    this._updeteView();
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

  handleKeyDown = (e) => {
    switch (e.key) {
      case 'Enter':
        if (this._isPlaying) {
          this._pause();
        } else {
          this._play();
        }
        break;
      case 'ArrowLeft': // налево
        this.game.movePieceLeft();
        this._updeteView();
        break;
      case 'ArrowUp': // налево
        this.game.rotatePiece();
        this._updeteView();
        break;
      case 'ArrowRight': // налево
        this.game.movePieceRight();
        this._updeteView();
        break;
      case 'ArrowDown': // налево
        this.game.movePieceDown();
        this._updeteView();
        break;
    }
  }
}

export default Controller
