"use strict";

import { SimpleShader } from "./shaders";
import * as vertexBuffers from "./vertex_buffer";

export const createShader = (gl) => {
  const vertexShaderSource = `
    attribute vec3 vertexPosition;

    void main(void) {
      gl_Position = vec4(vertexPosition, 1.0);
    }
  `;

  const fragmentShaderSource = `
    void main(void) {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
  `;

  return new SimpleShader(gl, vertexShaderSource, fragmentShaderSource);
}


export class Engine {
  constructor(canvasId) {
    const canvas = document.getElementById(canvasId);
    this.gl = canvas.getContext("webgl2");

    if (!this.gl) {
      document.write("<p><strong>WebGL 2 is not supported!</strong></p>");
    }

    this.shader = createShader(this.gl);
  }

  clearCanvas = (...color) => {
    this.gl.clearColor(...color);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  };

  drawSquare = () => {
    const vertexBuffer = vertexBuffers.init(this.gl);
    this.shader.activate(vertexBuffer);
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
  };
}

