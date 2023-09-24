class Controller {
  constructor(game, view) {
    this.game = game;
    this.view = view;
    this.handleKeyDown = this.handleKeyDown.bind(this);

    document.addEventListener('keydown', this.handleKeyDown);

    this.view.renderStartScreen();
  }

  handleKeyDown = (e) => {
    switch (e.key) {
      case 'Enter':
        this.view.renderMainScreen(this.game.getState());
      case 'ArrowLeft': // налево
        this.game.movePieceLeft();
        this.view.renderMainScreen(this.game.getState());
        break;
      case 'ArrowUp': // налево
        this.game.rotatePiece();
        this.view.renderMainScreen(this.game.getState());
        break;
      case 'ArrowRight': // налево
        this.game.movePieceRight();
        this.view.renderMainScreen(this.game.getState());
        break;
      case 'ArrowDown': // налево
        this.game.movePieceDown();
        this.view.renderMainScreen(this.game.getState());
        break;
    }
  }
}

export default Controller
