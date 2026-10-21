import { snoiseGLSL } from './noise'

/**
 * Signal Core.
 *
 * A geodesic shell displaced by 3D simplex noise. The solid pass contributes a
 * faint fresnel bloom; the wireframe pass reuses the exact same displacement so
 * the lines ride on the surface instead of hovering over it.
 */

export const coreVertexShader = /* glsl */ `
uniform float uTime;
uniform float uAmplitude;
uniform float uFrequency;
uniform float uTwist;

varying float vNoise;
varying vec3 vNormalW;
varying vec3 vViewDir;

${snoiseGLSL}

void main() {
  vec3 pos = position;

  // Rotate the sample point around Y so the displacement travels around the shell.
  float angle = uTwist * uTime;
  float c = cos(angle);
  float s = sin(angle);
  vec3 samplePoint = vec3(pos.x * c - pos.z * s, pos.y, pos.x * s + pos.z * c);

  float noise = snoise(normal * uFrequency + vec3(0.0, 0.0, uTime * 0.32));
  pos += normal * noise * uAmplitude;

  vNoise = noise;

  vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
  vNormalW = normalize(mat3(modelMatrix) * normal);
  vViewDir = normalize(cameraPosition - worldPosition.xyz);

  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`

export const coreFragmentShader = /* glsl */ `
precision highp float;

uniform vec3 uAccent;
uniform vec3 uBase;
uniform float uTime;
uniform float uRimPower;
uniform float uIntensity;
uniform float uWire;

varying float vNoise;
varying vec3 vNormalW;
varying vec3 vViewDir;

void main() {
  vec3 normal = normalize(vNormalW);
  vec3 view = normalize(vViewDir);

  float fresnel = pow(1.0 - clamp(dot(normal, view), 0.0, 1.0), uRimPower);
  float pulse = 0.86 + 0.14 * sin(uTime * 1.3);
  float band = smoothstep(-0.45, 0.65, vNoise);

  vec3 color = uBase;
  color += uAccent * fresnel * uIntensity * pulse;
  color += uAccent * band * 0.22 * uWire;

  float alpha = clamp(0.10 + fresnel * 0.95 + uWire * 0.35, 0.0, 1.0);

  gl_FragColor = vec4(color, alpha);
}
`
