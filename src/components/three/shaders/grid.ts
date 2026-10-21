/**
 * Infinite grid floor.
 *
 * A single plane, drawn entirely in the fragment shader: two grid scales, a
 * radial fade from the camera focus, and an expanding scan ring.
 */

export const gridVertexShader = /* glsl */ `
varying vec3 vWorld;

void main() {
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vWorld = worldPosition.xyz;
  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`

export const gridFragmentShader = /* glsl */ `
precision highp float;

uniform vec3 uColor;
uniform vec3 uScanColor;
uniform float uTime;
uniform vec2 uFocus;
uniform float uFade;
uniform float uScroll;

varying vec3 vWorld;

float gridMask(vec2 p, float scale) {
  vec2 coord = p * scale;
  vec2 derivative = fwidth(coord);
  vec2 grid = abs(fract(coord - 0.5) - 0.5) / derivative;
  return 1.0 - min(min(grid.x, grid.y), 1.0);
}

void main() {
  float distanceFromFocus = length(vWorld.xz - uFocus);
  float fade = 1.0 - smoothstep(uFade * 0.12, uFade, distanceFromFocus);

  float fine = gridMask(vWorld.xz, 1.0);
  float coarse = gridMask(vWorld.xz, 0.2) * 0.45;
  float lines = max(fine, coarse);

  // A ring that expands outward from the focus point.
  float travel = mod(uTime * 2.4, 22.0);
  float ring = 1.0 - smoothstep(0.0, 1.4, abs(distanceFromFocus - travel));
  float ringFade = 1.0 - smoothstep(0.0, 22.0, travel);

  vec3 color = uColor * lines * fade;
  color += uScanColor * ring * ringFade * 0.7;

  float alpha = clamp(lines * fade * 0.85 + ring * ringFade * 0.45 * fade, 0.0, 1.0);
  if (alpha < 0.002) discard;

  gl_FragColor = vec4(color, alpha);
}
`
