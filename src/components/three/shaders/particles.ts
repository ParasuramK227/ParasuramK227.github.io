/**
 * Drifting glyph field.
 *
 * Points rise through the volume, wrapping at the top. Each particle carries
 * an index into the glyph atlas, a size, a speed and a phase.
 */

export const particleVertexShader = /* glsl */ `
attribute float aGlyph;
attribute float aSize;
attribute float aSpeed;
attribute float aPhase;

uniform float uTime;
uniform float uPixelRatio;
uniform float uHeight;

varying float vGlyph;
varying float vFade;

void main() {
  vGlyph = aGlyph;

  vec3 drifted = position;
  float t = uTime * aSpeed + aPhase;

  drifted.y = mod(drifted.y + t * uHeight, uHeight) - uHeight * 0.5;
  drifted.x += sin(t * 0.5 + aPhase) * 0.45;
  drifted.z += cos(t * 0.42 + aPhase * 1.3) * 0.45;

  vec4 modelViewPosition = modelViewMatrix * vec4(drifted, 1.0);
  gl_Position = projectionMatrix * modelViewPosition;
  gl_PointSize = aSize * uPixelRatio * (16.0 / max(-modelViewPosition.z, 0.001));

  vFade = smoothstep(uHeight * 0.5, uHeight * 0.16, abs(drifted.y));
}
`

export const particleFragmentShader = /* glsl */ `
precision highp float;

uniform sampler2D uAtlas;
uniform vec3 uColor;
uniform float uOpacity;
uniform float uCols;
uniform float uRows;

varying float vGlyph;
varying float vFade;

void main() {
  float column = mod(vGlyph, uCols);
  float row = floor(vGlyph / uCols);

  // The atlas texture is flipped on upload, so the top of the cell maps to v = 1.
  vec2 uv = vec2(
    (column + gl_PointCoord.x) / uCols,
    1.0 - (row + gl_PointCoord.y) / uRows
  );

  float mask = texture2D(uAtlas, uv).a;
  if (mask < 0.08) discard;

  gl_FragColor = vec4(uColor, mask * uOpacity * vFade);
}
`
