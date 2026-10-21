import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { SignalCore } from './SignalCore'
import { OrbitRings } from './OrbitRings'
import { GridFloor } from './GridFloor'
import { GlyphParticles } from './GlyphParticles'
import type { SceneState } from './types'

export interface SceneProps {
  state: React.RefObject<SceneState>
  reducedMotion: boolean
  detail: number
  particleCount: number
  /** Composition offset — the subject sits right-of-centre on wide screens. */
  offset: [number, number, number]
}

/**
 * Scene assembly.
 *
 * The camera, the drag rotation and the idle spin are all integrated here in
 * a single `useFrame`, so a frame costs exactly one React-free update.
 */
export function Scene({ state, reducedMotion, detail, particleCount, offset }: SceneProps) {
  const assemblyRef = useRef<THREE.Group>(null)
  const camera = useThree((state) => state.camera)

  useFrame((_, delta) => {
    const scene = state.current
    const damping = Math.min(1, delta * 4)

    scene.pointer.x += (scene.pointerTarget.x - scene.pointer.x) * damping
    scene.pointer.y += (scene.pointerTarget.y - scene.pointer.y) * damping

    if (!scene.dragging && !reducedMotion) {
      scene.rotationTarget.y += delta * 0.1
    }

    scene.rotation.x += (scene.rotationTarget.x - scene.rotation.x) * damping
    scene.rotation.y += (scene.rotationTarget.y - scene.rotation.y) * damping

    if (assemblyRef.current) {
      assemblyRef.current.rotation.x = scene.rotation.x
      assemblyRef.current.rotation.y = scene.rotation.y
    }

    const targetX = scene.pointer.x * 0.7
    const targetY = 0.32 + scene.pointer.y * 0.48
    camera.position.x += (targetX - camera.position.x) * damping
    camera.position.y += (targetY - camera.position.y) * damping
    camera.position.z = 6.4
    camera.lookAt(0, 0, 0)
  })

  return (
    <>
      <group position={offset}>
        <group ref={assemblyRef}>
          <SignalCore reducedMotion={reducedMotion} detail={detail} />
          <OrbitRings reducedMotion={reducedMotion} />
        </group>
        <GridFloor reducedMotion={reducedMotion} />
      </group>

      <GlyphParticles reducedMotion={reducedMotion} count={particleCount} />
    </>
  )
}

/** Renders a single frame — used when the visitor prefers reduced motion. */
export function StaticFrame() {
  const invalidate = useThree((state) => state.invalidate)
  useFrame(() => invalidate(), 0)
  return null
}

/**
 * Watches frame time and reports once if the device cannot keep up, so the
 * caller can drop post-processing and lower the pixel ratio.
 */
export function PerformanceGuard({ onDegrade }: { onDegrade: () => void }) {
  const samples = useRef<number[]>([])
  const reported = useRef(false)

  useFrame((_, delta) => {
    if (reported.current) return
    samples.current.push(delta)
    if (samples.current.length < 90) return

    const average =
      samples.current.reduce((sum, value) => sum + value, 0) / samples.current.length
    samples.current = []

    if (average > 0.03) {
      reported.current = true
      onDegrade()
    }
  })

  return null
}

export { THREE }
