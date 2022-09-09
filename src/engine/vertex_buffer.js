"use strict";

const verticesOfSquare = [
  0.5, 0.5, 0.0,
  -0.5, 0.5, 0.0,
  0.5, -0.5, 0.0,
  -0.5, -0.5, 0.0
];

export const init = (gl) => {
  const vertexBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER, 
    new Float32Array(verticesOfSquare), 
    gl.STATIC_DRAW
  );

  return vertexBuffer;
};

