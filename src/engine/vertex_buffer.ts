const verticesOfSquare: number[] = [
  0.5, 0.5, 0.0,
  -0.5, 0.5, 0.0,
  0.5, -0.5, 0.0,
  -0.5, -0.5, 0.0
];

export const init = (gl: WebGLRenderingContext): WebGLBuffer => {
  const vertexBuffer = gl.createBuffer();

  if (!vertexBuffer) {
    throw new Error("Could not create buffer!");
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER, 
    new Float32Array(verticesOfSquare), 
    gl.STATIC_DRAW
  );


  return vertexBuffer;
};
