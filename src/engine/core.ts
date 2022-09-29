import { SimpleShader } from "./shaders";

export class Engine {
  gl: WebGLRenderingContext | null = null;
  shader: SimpleShader | null = null;

  constructor(canvasId: string) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;

    if (canvas === null) {
      document.write("<p><strong>Canvas element missing!</strong></p>");
    }

    this.gl = canvas.getContext("webgl2");

    if (this.gl === null) {
      document.write("<p><strong>WebGL 2 is not supported!</strong></p>");
    }
  }

  createShader = (vertexShaderSource: string, fragmentShaderSource: string) => {
    if (this.gl !== null) {
      this.shader = new SimpleShader(this.gl, vertexShaderSource, fragmentShaderSource);
    }
  };

  clearCanvas = (...rgba: [number, number, number, number]) => {
    if (this.gl !== null) {
      this.gl.clearColor(...rgba);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
  };

  drawSquare = (...rgba: [number, number, number, number]) => {
    if (this.shader !== null && this.gl !== null) {
      this.shader.activate(rgba);
      this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }
  };
}
