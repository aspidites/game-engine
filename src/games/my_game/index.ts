import { Engine } from "../../engine/core";
import vertexShaderSource from './assets/glsl/square/vertex.glsl';
import fragmentShaderSource from './assets/glsl/square/fragment.glsl';

export default class MyGame {
  engine: Engine

  constructor(canvasId: string) {
    this.engine = new Engine(canvasId);
    this.engine.createShader(vertexShaderSource, fragmentShaderSource);
  }

  run = () => {
    this.engine.clearCanvas(0, 0.8, 0, 1); 
    this.engine.drawSquare(1, 0, 0, 1);
  }
}
