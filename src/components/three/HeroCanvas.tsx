import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Bloom, ChromaticAberration, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Vector2 } from 'three'
import { PerformanceGuard, Scene, StaticFrame } from './Scene'
import { createSceneState } from './types'
import { HERO_COLORS } from './palette'
import { useMediaQuery } from '@/lib/hooks'

function WebGLFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[var(--c-hero-bg)]">
      <p className="hud px-6 text-center text-[var(--c-hero-dim)]">
        interactive viewport unavailable — webgl not supported
      </p>
    </div>
  )
}

/**
 * The hero viewport.
 *
 * Owns the DOM event layer (pointer parallax and drag-to-rotate), the render
 * loop budget and the quality fallbacks. Every animated value is integrated
 * inside `useFrame`, so the React tree never re-renders while the scene runs.
 */
export function HeroCanvas({ reducedMotion }: { reducedMotion: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const state = useRef(createSceneState())

  const [degraded, setDegraded] = useState(false)
  const [visible, setVisible] = useState(true)

  const isWide = useMediaQuery('(min-width: 768px)')
  const isSmall = useMediaQuery('(max-width: 640px)')

  const dpr = useMemo<[number, number]>(() => {
    if (degraded) return [1, 1]
    return [1, isSmall ? 1.5 : 1.75]
  }, [degraded, isSmall])

  const detail = isSmall ? 3 : 5
  const particleCount = degraded ? 420 : isSmall ? 900 : 2000
  const offset: [number, number, number] = isWide ? [1.45, 0, 0] : [0, 1.0, 0]

  const chromaticOffset = useMemo(() => new Vector2(0.00055, 0.00055), [])

  // Pause rendering once the hero scrolls out of view.
  useEffect(() => {
    const element = containerRef.current
    if (!element) return
    const observer = new IntersectionObserver(
      (entries) => setVisible(entries.some((entry) => entry.isIntersecting)),
      { threshold: 0 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const scene = state.current

    if (scene.dragging) {
      const deltaX = event.clientX - scene.dragStartX
      const deltaY = event.clientY - scene.dragStartY
      scene.rotationTarget.y = scene.dragStartRotY + deltaX * 0.006
      scene.rotationTarget.x = Math.max(
        -0.7,
        Math.min(0.7, scene.dragStartRotX + deltaY * 0.004),
      )
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    scene.pointerTarget.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    scene.pointerTarget.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1)
  }, [])

  const handlePointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return
    const scene = state.current
    scene.dragging = true
    scene.dragStartX = event.clientX
    scene.dragStartY = event.clientY
    scene.dragStartRotX = scene.rotationTarget.x
    scene.dragStartRotY = scene.rotationTarget.y
    event.currentTarget.setPointerCapture(event.pointerId)
  }, [])

  const handlePointerUp = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const scene = state.current
    scene.dragging = false
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }, [])

  const handlePointerLeave = useCallback(() => {
    const scene = state.current
    scene.pointerTarget.x = 0
    scene.pointerTarget.y = 0
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 touch-pan-y select-none"
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerLeave}
    >
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0.32, 6.4], fov: 42, near: 0.1, far: 120 }}
        gl={{
          antialias: !degraded,
          alpha: false,
          stencil: false,
          powerPreference: 'high-performance',
        }}
        frameloop={reducedMotion ? 'demand' : visible ? 'always' : 'never'}
        fallback={<WebGLFallback />}
      >
        <color attach="background" args={[HERO_COLORS.bg]} />

        <Suspense fallback={null}>
          <Scene
            state={state}
            reducedMotion={reducedMotion}
            detail={detail}
            particleCount={particleCount}
            offset={offset}
          />
        </Suspense>

        {reducedMotion ? <StaticFrame /> : null}

        {!degraded ? (
          <>
            <PerformanceGuard onDegrade={() => setDegraded(true)} />
            <EffectComposer>
              <Bloom
                intensity={0.8}
                luminanceThreshold={0.38}
                luminanceSmoothing={0.35}
                mipmapBlur
                radius={0.7}
              />
              <ChromaticAberration
                offset={chromaticOffset}
                radialModulation
                modulationOffset={0.3}
              />
              <Vignette offset={0.26} darkness={0.7} />
              <Noise premultiply blendFunction={BlendFunction.OVERLAY} opacity={0.05} />
            </EffectComposer>
          </>
        ) : null}
      </Canvas>
    </div>
  )
}
