class View {
  constructor(setting) {
    this._setting = setting;
    this._element = document.querySelector(this._setting.elementSelector);
    this._width = this._setting.width;
    this._height = this._setting.height;
    this._rows = this._setting.rows;
    this._columns = this._setting.columns;
    // ширина колонки
    this._blockWidth = this._width / this._columns;
    // высота колонки
    this._blockHeight = this._height / this._rows;
    // создание canvas
    this._canvas = document.createElement('canvas');
    this._canvas.style.border = '2px solid #E4E4E4'
    this._canvas.width = this._width;
    this._canvas.height = this._height;
    this._context = this._canvas.getContext('2d');
    // добавление на страницу
    this._element.appendChild(this._canvas);
  }

  _renderBlock = (x, y, width, height, color) => {
    this._context.fillStyle = color;
    this._context.strokeStyle = '#E4E4E4';
    this._context.lineWidth = 2;

    this._context.fillRect(x, y, width, height);
    this._context.strokeRect(x, y, width, height);
  }

  _renderPlayField = (playfield) => {
    for (let y = 0; y < playfield.length; y++) {
      const line = playfield[y];

      for (let x = 0; x < line.length; x++) {
        const block = line[x];

        if (block) {
          this._renderBlock(x * this._blockWidth, y * this._blockHeight, this._blockWidth, this._blockHeight, '#3087E7');
        }
      }
    }
  }

  // очистка холста
  _clearScreen = () => {
    this._context.clearRect(0, 0, this._width, this._height);
  }

  render = ({ playfield }) => {
    this._clearScreen();

    this._renderPlayField(playfield);
  }
}

export default View
