export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  renderItems(items) {
    // items.reverse();
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(cardElement) {
    this._containerSelector.prepend(cardElement);
  }
}
