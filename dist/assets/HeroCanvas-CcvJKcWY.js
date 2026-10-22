import{r as e}from"./rolldown-runtime-XKyaHtl9.js";import{a as t,c as n,d as r,f as i,g as a,i as o,l as s,m as c,n as l,o as u,p as d,r as f,s as p,t as m,u as h}from"./three-BJcRDlgy.js";import{t as g}from"./index-BIqgl4MB.js";var _=e(a(),1),v=`
uniform float uTime;
uniform float uAmplitude;
uniform float uFrequency;
uniform float uTwist;

varying float vNoise;
varying vec3 vNormalW;
varying vec3 vViewDir;


vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}


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
`,y=`
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
`,b={bg:`#08090C`,accent:`#4FE0BE`,accentDim:`#1C6355`,signal:`#FFB454`,grid:`#1A6155`,scan:`#3FD8B8`},x=c();function S({reducedMotion:e,detail:t}){let i=(0,_.useRef)(null),a=(0,_.useMemo)(()=>({uTime:{value:0},uAmplitude:{value:.17},uFrequency:{value:1.2},uTwist:{value:.14},uAccent:{value:new r(b.accent)},uBase:{value:new r(`#03120F`)},uRimPower:{value:2.35},uIntensity:{value:1},uWire:{value:0}}),[]),o=(0,_.useMemo)(()=>({...a,uBase:{value:new r(`#020806`)},uIntensity:{value:1.6},uWire:{value:1}}),[a]);return n(t=>{let n=e?0:t.clock.elapsedTime;a.uTime.value=n,i.current&&!e&&(i.current.rotation.y=n*.08,i.current.rotation.z=Math.sin(n*.21)*.05)}),(0,x.jsxs)(`group`,{ref:i,children:[(0,x.jsxs)(`mesh`,{children:[(0,x.jsx)(`icosahedronGeometry`,{args:[1.52,t]}),(0,x.jsx)(`shaderMaterial`,{vertexShader:v,fragmentShader:y,uniforms:a,transparent:!0,depthWrite:!1,blending:2,side:2})]}),(0,x.jsxs)(`mesh`,{children:[(0,x.jsx)(`icosahedronGeometry`,{args:[1.52,t]}),(0,x.jsx)(`shaderMaterial`,{vertexShader:v,fragmentShader:y,uniforms:o,wireframe:!0,transparent:!0,depthWrite:!1,blending:2})]})]})}function C({reducedMotion:e}){let t=(0,_.useRef)(null),r=(0,_.useRef)(null),i=(0,_.useRef)(null),a=(0,_.useRef)(null);return n((n,o)=>{if(e)return;let s=n.clock.elapsedTime;t.current&&(t.current.rotation.z+=o*.26),r.current&&(r.current.rotation.z-=o*.19),i.current&&(i.current.rotation.x+=o*.13,i.current.rotation.y=s*.09),a.current&&a.current.position.set(Math.cos(s*.8)*2.15,Math.sin(s*.8)*2.15,0)}),(0,x.jsxs)(`group`,{children:[(0,x.jsxs)(`mesh`,{ref:t,rotation:[Math.PI/2.4,0,0],children:[(0,x.jsx)(`torusGeometry`,{args:[2.12,.0055,6,190]}),(0,x.jsx)(`meshBasicMaterial`,{color:b.accent,transparent:!0,opacity:.42})]}),(0,x.jsxs)(`mesh`,{ref:r,rotation:[Math.PI/2.9,Math.PI/5,0],children:[(0,x.jsx)(`torusGeometry`,{args:[2.38,.0045,6,190]}),(0,x.jsx)(`meshBasicMaterial`,{color:b.accentDim,transparent:!0,opacity:.65})]}),(0,x.jsxs)(`mesh`,{ref:i,rotation:[0,0,Math.PI/3.6],children:[(0,x.jsx)(`torusGeometry`,{args:[1.95,.004,6,170]}),(0,x.jsx)(`meshBasicMaterial`,{color:b.signal,transparent:!0,opacity:.3})]}),(0,x.jsxs)(`mesh`,{ref:a,children:[(0,x.jsx)(`octahedronGeometry`,{args:[.055,0]}),(0,x.jsx)(`meshBasicMaterial`,{color:b.signal,transparent:!0,opacity:.9})]})]})}var w=`
varying vec3 vWorld;

void main() {
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vWorld = worldPosition.xyz;
  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`,T=`
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
`;function E({reducedMotion:e}){let t=s(e=>e.camera),i=(0,_.useMemo)(()=>({uColor:{value:new r(b.grid)},uScanColor:{value:new r(b.scan)},uTime:{value:0},uFocus:{value:new d(0,0)},uFade:{value:26},uScroll:{value:0}}),[]);return n(n=>{i.uTime.value=e?3.2:n.clock.elapsedTime,i.uFocus.value.set(t.position.x,t.position.z)}),(0,x.jsxs)(`mesh`,{rotation:[-Math.PI/2,0,0],position:[0,-2.15,0],children:[(0,x.jsx)(`planeGeometry`,{args:[90,90,1,1]}),(0,x.jsx)(`shaderMaterial`,{vertexShader:w,fragmentShader:T,uniforms:i,transparent:!0,depthWrite:!1,side:2})]})}var D=`
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
`,O=`
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
`,k=`01<>/{}[]#$%&*+-_=~^|\\;:.,AFTX?@`.split(``);function A(){let e=document.createElement(`canvas`);e.width=512,e.height=320;let t=e.getContext(`2d`);if(!t)throw Error(`Unable to create glyph atlas canvas`);t.clearRect(0,0,e.width,e.height),t.fillStyle=`#ffffff`,t.font=`600 38px ui-monospace, "JetBrains Mono Variable", SFMono-Regular, Menlo, monospace`,t.textAlign=`center`,t.textBaseline=`middle`;for(let e=0;e<40;e+=1){let n=e%8,r=Math.floor(e/8);t.fillText(k[e%k.length],n*64+32,r*64+32)}let n=new h(e);return n.generateMipmaps=!1,n.minFilter=i,n.magFilter=i,n.needsUpdate=!0,n}var j=13,M=8,N=10;function P({reducedMotion:e,count:t}){let i=s(e=>e.gl),a=(0,_.useMemo)(()=>A(),[]),{positions:o,glyphs:c,sizes:l,speeds:u,phases:d}=(0,_.useMemo)(()=>{let e=new Float32Array(t*3),n=new Float32Array(t),r=new Float32Array(t),i=new Float32Array(t),a=new Float32Array(t);for(let o=0;o<t;o+=1)e[o*3+0]=(Math.random()-.5)*j,e[o*3+1]=(Math.random()-.5)*N,e[o*3+2]=(Math.random()-.5)*M-1.2,n[o]=Math.floor(Math.random()*8*5),r[o]=7+Math.random()*12,i[o]=.16+Math.random()*.55,a[o]=Math.random()*Math.PI*2;return{positions:e,glyphs:n,sizes:r,speeds:i,phases:a}},[t]),f=(0,_.useMemo)(()=>({uTime:{value:0},uPixelRatio:{value:1},uHeight:{value:N},uAtlas:{value:a},uColor:{value:new r(b.accent)},uOpacity:{value:.5},uCols:{value:8},uRows:{value:5}}),[a]);return(0,_.useEffect)(()=>{f.uPixelRatio.value=Math.min(i.getPixelRatio(),2)},[i,f]),(0,_.useEffect)(()=>()=>a.dispose(),[a]),n(t=>{f.uTime.value=e?0:t.clock.elapsedTime}),(0,x.jsxs)(`points`,{frustumCulled:!1,children:[(0,x.jsxs)(`bufferGeometry`,{children:[(0,x.jsx)(`bufferAttribute`,{attach:`attributes-position`,args:[o,3],count:o.length/3}),(0,x.jsx)(`bufferAttribute`,{attach:`attributes-aGlyph`,args:[c,1],count:c.length}),(0,x.jsx)(`bufferAttribute`,{attach:`attributes-aSize`,args:[l,1],count:l.length}),(0,x.jsx)(`bufferAttribute`,{attach:`attributes-aSpeed`,args:[u,1],count:u.length}),(0,x.jsx)(`bufferAttribute`,{attach:`attributes-aPhase`,args:[d,1],count:d.length})]}),(0,x.jsx)(`shaderMaterial`,{vertexShader:D,fragmentShader:O,uniforms:f,transparent:!0,depthWrite:!1,blending:2})]})}function F({state:e,reducedMotion:t,detail:r,particleCount:i,offset:a}){let o=(0,_.useRef)(null),c=s(e=>e.camera);return n((n,r)=>{let i=e.current,a=Math.min(1,r*4);i.pointer.x+=(i.pointerTarget.x-i.pointer.x)*a,i.pointer.y+=(i.pointerTarget.y-i.pointer.y)*a,!i.dragging&&!t&&(i.rotationTarget.y+=r*.1),i.rotation.x+=(i.rotationTarget.x-i.rotation.x)*a,i.rotation.y+=(i.rotationTarget.y-i.rotation.y)*a,o.current&&(o.current.rotation.x=i.rotation.x,o.current.rotation.y=i.rotation.y);let s=i.pointer.x*.7,l=.32+i.pointer.y*.48;c.position.x+=(s-c.position.x)*a,c.position.y+=(l-c.position.y)*a,c.position.z=6.4,c.lookAt(0,0,0)}),(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(`group`,{position:a,children:[(0,x.jsxs)(`group`,{ref:o,children:[(0,x.jsx)(S,{reducedMotion:t,detail:r}),(0,x.jsx)(C,{reducedMotion:t})]}),(0,x.jsx)(E,{reducedMotion:t})]}),(0,x.jsx)(P,{reducedMotion:t,count:i})]})}function I(){let e=s(e=>e.invalidate);return n(()=>e(),0),null}function L({onDegrade:e}){let t=(0,_.useRef)([]),r=(0,_.useRef)(!1);return n((n,i)=>{if(r.current||(t.current.push(i),t.current.length<90))return;let a=t.current.reduce((e,t)=>e+t,0)/t.current.length;t.current=[],a>.03&&(r.current=!0,e())}),null}function R(){return{pointer:{x:0,y:0},pointerTarget:{x:0,y:0},rotation:{x:0,y:0},rotationTarget:{x:0,y:0},dragging:!1,dragStartX:0,dragStartY:0,dragStartRotX:0,dragStartRotY:0}}function z(){return(0,x.jsx)(`div`,{className:`flex h-full w-full items-center justify-center bg-[var(--c-hero-bg)]`,children:(0,x.jsx)(`p`,{className:`hud px-6 text-center text-[var(--c-hero-dim)]`,children:`interactive viewport unavailable — webgl not supported`})})}function B({reducedMotion:e}){let n=(0,_.useRef)(null),r=(0,_.useRef)(R()),[i,a]=(0,_.useState)(!1),[s,c]=(0,_.useState)(!0),h=g(`(min-width: 768px)`),v=g(`(max-width: 640px)`),y=(0,_.useMemo)(()=>i?[1,1]:[1,v?1.5:1.75],[i,v]),S=v?3:5,C=i?420:v?900:2e3,w=h?[1.45,0,0]:[0,1,0],T=(0,_.useMemo)(()=>new d(55e-5,55e-5),[]);(0,_.useEffect)(()=>{let e=n.current;if(!e)return;let t=new IntersectionObserver(e=>c(e.some(e=>e.isIntersecting)),{threshold:0});return t.observe(e),()=>t.disconnect()},[]);let E=(0,_.useCallback)(e=>{let t=r.current;if(t.dragging){let n=e.clientX-t.dragStartX,r=e.clientY-t.dragStartY;t.rotationTarget.y=t.dragStartRotY+n*.006,t.rotationTarget.x=Math.max(-.7,Math.min(.7,t.dragStartRotX+r*.004));return}let n=e.currentTarget.getBoundingClientRect();t.pointerTarget.x=(e.clientX-n.left)/n.width*2-1,t.pointerTarget.y=-((e.clientY-n.top)/n.height*2-1)},[]),D=(0,_.useCallback)(e=>{if(e.pointerType===`touch`)return;let t=r.current;t.dragging=!0,t.dragStartX=e.clientX,t.dragStartY=e.clientY,t.dragStartRotX=t.rotationTarget.x,t.dragStartRotY=t.rotationTarget.y,e.currentTarget.setPointerCapture(e.pointerId)},[]),O=(0,_.useCallback)(e=>{let t=r.current;t.dragging=!1,e.currentTarget.hasPointerCapture(e.pointerId)&&e.currentTarget.releasePointerCapture(e.pointerId)},[]),k=(0,_.useCallback)(()=>{let e=r.current;e.pointerTarget.x=0,e.pointerTarget.y=0},[]);return(0,x.jsx)(`div`,{ref:n,className:`absolute inset-0 touch-pan-y select-none`,onPointerMove:E,onPointerDown:D,onPointerUp:O,onPointerCancel:O,onPointerLeave:k,children:(0,x.jsxs)(p,{dpr:y,camera:{position:[0,.32,6.4],fov:42,near:.1,far:120},gl:{antialias:!i,alpha:!1,stencil:!1,powerPreference:`high-performance`},frameloop:e?`demand`:s?`always`:`never`,fallback:(0,x.jsx)(z,{}),children:[(0,x.jsx)(`color`,{attach:`background`,args:[b.bg]}),(0,x.jsx)(_.Suspense,{fallback:null,children:(0,x.jsx)(F,{state:r,reducedMotion:e,detail:S,particleCount:C,offset:w})}),e?(0,x.jsx)(I,{}):null,i?null:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(L,{onDegrade:()=>a(!0)}),(0,x.jsxs)(f,{children:[(0,x.jsx)(m,{intensity:.8,luminanceThreshold:.38,luminanceSmoothing:.35,mipmapBlur:!0,radius:.7}),(0,x.jsx)(l,{offset:T,radialModulation:!0,modulationOffset:.3}),(0,x.jsx)(t,{offset:.26,darkness:.7}),(0,x.jsx)(o,{premultiply:!0,blendFunction:u.OVERLAY,opacity:.05})]})]})]})})}export{B as HeroCanvas};