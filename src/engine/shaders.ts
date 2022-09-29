import * as vertexBuffers from "./vertex_buffer";

const compile = (gl: WebGLRenderingContext, source: string, shaderType: number): WebGLShader => {
  const compiledShader = gl.createShader(shaderType);

  if (compiledShader !== null) {
    gl.shaderSource(compiledShader, source);
    gl.compileShader(compiledShader);

    if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
      throw new Error(
        `A shader compiling error occcurred: ${gl.getShaderInfoLog(compiledShader)}`
      );
    }

    return compiledShader;

  } else {
    throw new Error("Failed to create shader");
  }
};


export class SimpleShader {
  gl: WebGLRenderingContext;
  vertexShader: WebGLShader;
  fragmentShader: WebGLShader;
  program: WebGLProgram | null;
  vertexBuffer: WebGLBuffer | null = null;
  vertexPositionRef: number | null = null;
  pixelColorRef: WebGLUniformLocation | null = null;

  constructor(
    gl: WebGLRenderingContext,
    vertexShaderSource: string,
    fragmentShaderSource: string
  ) {
    this.gl = gl;
    this.vertexShader = compile(this.gl, vertexShaderSource, this.gl.VERTEX_SHADER);
    this.fragmentShader = compile(this.gl, fragmentShaderSource, this.gl.FRAGMENT_SHADER);
    this.program = this.gl.createProgram();

    if (this.program !== null) {
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
  }

  activate = (pixelColor: [number, number, number, number]) => {
    this.gl.useProgram(this.program);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);

    if (this.vertexPositionRef !== null) {
      this.gl.vertexAttribPointer(
        this.vertexPositionRef,
        3,
        this.gl.FLOAT,
        false,
        0,
        0
      );

      this.gl.enableVertexAttribArray(this.vertexPositionRef);
    }

    this.gl.uniform4fv(this.pixelColorRef, pixelColor);
  }
}
