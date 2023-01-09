import { myJson } from "..";
import { Product } from "../modules/interfaces";
import { Component } from "./components";

export class ErrorComponent extends Component {
  constructor(tagName: string = 'main', className: string = 'error', obj: Product[] = myJson) {
    super(tagName, className, obj)
  }

  render() {
    const errorEmoji = document.createElement('span');
    errorEmoji.innerText = '😢'
    errorEmoji.className = 'error-emoji'

    const errorText = document.createElement('span');
    errorText.className = 'error-text'
    errorText.innerText = 'There is no such page'

    this.container.append(errorEmoji, errorText);
    return this.container;
  }
}