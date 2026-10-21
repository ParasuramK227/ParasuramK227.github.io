import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { HERO_COLORS } from './palette'

/**
 * Data rings.
 *
 * Three thin rings on independent axes, each carrying a small satellite.
 * They counter-rotate so the assembly never looks like a single rigid body.
 */
export function OrbitRings({ reducedMotion }: { reducedMotion: boolean }) {
  const ringARef = useRef<THREE.Mesh>(null)
  const ringBRef = useRef<THREE.Mesh>(null)
  const ringCRef = useRef<THREE.Mesh>(null)
  const satelliteRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (reducedMotion) return
    const t = state.clock.elapsedTime

    if (ringARef.current) ringARef.current.rotation.z += delta * 0.26
    if (ringBRef.current) ringBRef.current.rotation.z -= delta * 0.19
    if (ringCRef.current) {
      ringCRef.current.rotation.x += delta * 0.13
      ringCRef.current.rotation.y = t * 0.09
    }
    if (satelliteRef.current) {
      satelliteRef.current.position.set(
        Math.cos(t * 0.8) * 2.15,
        Math.sin(t * 0.8) * 2.15,
        0,
      )
    }
  })

  return (
    <group>
      <mesh ref={ringARef} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.12, 0.0055, 6, 190]} />
        <meshBasicMaterial color={HERO_COLORS.accent} transparent opacity={0.42} />
      </mesh>

      <mesh ref={ringBRef} rotation={[Math.PI / 2.9, Math.PI / 5, 0]}>
        <torusGeometry args={[2.38, 0.0045, 6, 190]} />
        <meshBasicMaterial color={HERO_COLORS.accentDim} transparent opacity={0.65} />
      </mesh>

      <mesh ref={ringCRef} rotation={[0, 0, Math.PI / 3.6]}>
        <torusGeometry args={[1.95, 0.004, 6, 170]} />
        <meshBasicMaterial color={HERO_COLORS.signal} transparent opacity={0.3} />
      </mesh>

      <mesh ref={satelliteRef}>
        <octahedronGeometry args={[0.055, 0]} />
        <meshBasicMaterial color={HERO_COLORS.signal} transparent opacity={0.9} />
      </mesh>
    </group>
  )
}
