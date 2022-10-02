export class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  addItemFromServer(cardElement) {
    this._container.append(cardElement);
  }

  addItemFromForm(cardElement) {
    this._container.prepend(cardElement);
  }
}