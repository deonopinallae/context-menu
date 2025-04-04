import { Module } from "../core/module";
import { generateRandomColor } from "../utils";

export class BackgroundModule extends Module {
  constructor() {
    super("background", "Смена фона");
  }
  trigger() {
    const color = generateRandomColor();
    document.body.style.transition = "background-color 0.5s ease";
    document.body.style.backgroundColor = color;
  }
}
