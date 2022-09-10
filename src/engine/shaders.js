import * as vertexBuffers from "./vertex_buffer";

const compile = (gl, source, shaderType) => {
  const compiledShader = gl.createShader(shaderType);

  gl.shaderSource(compiledShader, source);
  gl.compileShader(compiledShader);

  if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
    throw new Error(
      `A shader compiling error occcurred: ${gl.getShaderInfoLog(compiledShader)}`
    );
  }

  return compiledShader;
};


export class SimpleShader {
  constructor(gl, vertexShaderSource, fragmentShaderSource) {
    this.gl = gl;
    this.vertexShader = compile(this.gl, vertexShaderSource, this.gl.VERTEX_SHADER);
    this.fragmentShader = compile(this.gl, fragmentShaderSource, this.gl.FRAGMENT_SHADER);
    this.program = this.gl.createProgram();

    this.gl.attachShader(this.program, this.vertexShader);
    this.gl.attachShader(this.program, this.fragmentShader);
    this.gl.linkProgram(this.program);

    if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
      throw new Error("Error linking shader");
    }

    this.vertexBuffer = vertexBuffers.init(this.gl);
    this.vertexPositionRef = this.gl.getAttribLocation(this.program, "vertexPosition");
    this.pixelColorRef = this.gl.getUniformLocation(this.program, "pixelColor");
  }

  activate = (pixelColor) => {
    this.gl.useProgram(this.program);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
    this.gl.vertexAttribPointer(
      this.vertexPositionRef,
      3,
      this.gl.FLOAT,
      false,
      0,
      0
    );
    this.gl.enableVertexAttribArray(this.vertexPositionRef);

    this.gl.uniform4fv(this.pixelColorRef, pixelColor);
  }
}
