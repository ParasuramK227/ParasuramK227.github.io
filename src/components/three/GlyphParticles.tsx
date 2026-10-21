import { useEffect, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { particleFragmentShader, particleVertexShader } from './shaders/particles'
import { ATLAS_COLS, ATLAS_ROWS, createGlyphAtlas } from './glyphAtlas'
import { HERO_COLORS } from './palette'

const SPAN_X = 13
const SPAN_Z = 8
const SPAN_Y = 10

/**
 * Drifting glyph field.
 *
 * Points rise through the volume and wrap at the top. Each one samples a
 * character from the atlas, so the field reads as data moving through the
 * scene rather than as a generic particle cloud.
 */
export function GlyphParticles({
  reducedMotion,
  count,
}: {
  reducedMotion: boolean
  count: number
}) {
  const gl = useThree((state) => state.gl)

  const atlas = useMemo(() => createGlyphAtlas(), [])

  const { positions, glyphs, sizes, speeds, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const glyphs = new Float32Array(count)
    const sizes = new Float32Array(count)
    const speeds = new Float32Array(count)
    const phases = new Float32Array(count)

    for (let index = 0; index < count; index += 1) {
      positions[index * 3 + 0] = (Math.random() - 0.5) * SPAN_X
      positions[index * 3 + 1] = (Math.random() - 0.5) * SPAN_Y
      positions[index * 3 + 2] = (Math.random() - 0.5) * SPAN_Z - 1.2

      glyphs[index] = Math.floor(Math.random() * ATLAS_COLS * ATLAS_ROWS)
      sizes[index] = 7 + Math.random() * 12
      speeds[index] = 0.16 + Math.random() * 0.55
      phases[index] = Math.random() * Math.PI * 2
    }

    return { positions, glyphs, sizes, speeds, phases }
  }, [count])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: 1 },
      uHeight: { value: SPAN_Y },
      uAtlas: { value: atlas },
      uColor: { value: new THREE.Color(HERO_COLORS.accent) },
      uOpacity: { value: 0.5 },
      uCols: { value: ATLAS_COLS },
      uRows: { value: ATLAS_ROWS },
    }),
    [atlas],
  )

  useEffect(() => {
    uniforms.uPixelRatio.value = Math.min(gl.getPixelRatio(), 2)
  }, [gl, uniforms])

  useEffect(() => () => atlas.dispose(), [atlas])

  useFrame((state) => {
    uniforms.uTime.value = reducedMotion ? 0 : state.clock.elapsedTime
  })

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
        />
        <bufferAttribute attach="attributes-aGlyph" args={[glyphs, 1]} count={glyphs.length} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} count={sizes.length} />
        <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} count={speeds.length} />
        <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} count={phases.length} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
