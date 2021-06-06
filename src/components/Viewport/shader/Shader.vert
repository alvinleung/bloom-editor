precision mediump float;

attribute vec3 position;
attribute vec4 color;
uniform mat4 pMatrix;
uniform mat4 mvMatrix;
varying vec4 vColor;

void main(void){
  vColor = color;
  gl_Position = pMatrix * mvMatrix * vec4(position, 1.0);
}

