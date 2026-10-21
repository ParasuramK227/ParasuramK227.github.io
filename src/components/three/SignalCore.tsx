import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { coreFragmentShader, coreVertexShader } from './shaders/core'
import { HERO_COLORS } from './palette'

/**
 * The core itself: a geodesic shell pushed around by 3D simplex noise.
 *
 * Two passes share one displacement function — a faint solid shell for the
 * fresnel bloom, and a brighter wireframe that rides exactly on the surface.
 */
export function SignalCore({
  reducedMotion,
  detail,
}: {
  reducedMotion: boolean
  detail: number
}) {
  const groupRef = useRef<THREE.Group>(null)

  const solidUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmplitude: { value: 0.17 },
      uFrequency: { value: 1.2 },
      uTwist: { value: 0.14 },
      uAccent: { value: new THREE.Color(HERO_COLORS.accent) },
      uBase: { value: new THREE.Color('#03120F') },
      uRimPower: { value: 2.35 },
      uIntensity: { value: 1.0 },
      uWire: { value: 0 },
    }),
    [],
  )

  const wireUniforms = useMemo(
    () => ({
      ...solidUniforms,
      uBase: { value: new THREE.Color('#020806') },
      uIntensity: { value: 1.6 },
      uWire: { value: 1 },
    }),
    [solidUniforms],
  )

  useFrame((state) => {
    const time = reducedMotion ? 0 : state.clock.elapsedTime
    solidUniforms.uTime.value = time
    if (groupRef.current && !reducedMotion) {
      groupRef.current.rotation.y = time * 0.08
      groupRef.current.rotation.z = Math.sin(time * 0.21) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[1.52, detail]} />
        <shaderMaterial
          vertexShader={coreVertexShader}
          fragmentShader={coreFragmentShader}
          uniforms={solidUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh>
        <icosahedronGeometry args={[1.52, detail]} />
        <shaderMaterial
          vertexShader={coreVertexShader}
          fragmentShader={coreFragmentShader}
          uniforms={wireUniforms}
          wireframe
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}
