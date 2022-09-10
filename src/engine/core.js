"use strict";

import { SimpleShader } from "./shaders";



export class Engine {
  constructor(canvasId) {
    const canvas = document.getElementById(canvasId);
    this.gl = canvas.getContext("webgl2");

    if (!this.gl) {
      document.write("<p><strong>WebGL 2 is not supported!</strong></p>");
    }

    this.shader = null;
  }

  createShader = (vertexShaderSource, fragmentShaderSource) => {
    this.shader = new SimpleShader(this.gl, vertexShaderSource, fragmentShaderSource);
  };

  clearCanvas = (...color) => {
    this.gl.clearColor(...color);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  };

  drawSquare = (...color) => {
    this.shader.activate(color);
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
  };
}

