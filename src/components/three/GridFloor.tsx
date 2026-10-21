import { useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { gridFragmentShader, gridVertexShader } from './shaders/grid'
import { HERO_COLORS } from './palette'

/**
 * Grid floor.
 *
 * One plane; the grid, the distance fade and the scan ring are all computed
 * per fragment. The fade follows the camera so the floor never shows an edge.
 */
export function GridFloor({ reducedMotion }: { reducedMotion: boolean }) {
  const camera = useThree((state) => state.camera)

  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(HERO_COLORS.grid) },
      uScanColor: { value: new THREE.Color(HERO_COLORS.scan) },
      uTime: { value: 0 },
      uFocus: { value: new THREE.Vector2(0, 0) },
      uFade: { value: 26 },
      uScroll: { value: 0 },
    }),
    [],
  )

  useFrame((state) => {
    uniforms.uTime.value = reducedMotion ? 3.2 : state.clock.elapsedTime
    uniforms.uFocus.value.set(camera.position.x, camera.position.z)
  })

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.15, 0]}>
      <planeGeometry args={[90, 90, 1, 1]} />
      <shaderMaterial
        vertexShader={gridVertexShader}
        fragmentShader={gridFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
