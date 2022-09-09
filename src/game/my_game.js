import { Engine } from "../engine/core.js";

export default class MyGame {
  constructor(canvasId) {
    this.engine = new Engine(canvasId);
  }

  run = () => {
    this.engine.clearCanvas(0, 0.8, 0, 1); 
    this.engine.drawSquare();
  }
}
