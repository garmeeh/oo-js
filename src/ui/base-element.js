import $ from 'jquery';

export class BaseElement {
  constructor() {
    this.element = null; // jQuery element
  }

  appendToElement(el) {
    this.createElement(el);
    el.append(this.element);
    this.enableJs();
  }

  createElement() {
    const s = this.getElementString();
    this.element = $(s);
  }

  getElementString() {
    throw 'Please overide getElementString in BaseElement';
  }

  enableJs() {
    componentHandler.upgradeElement(this.element[0]);
  }
}