/** Mutable state shared between the DOM event layer and the render loop. */
export interface SceneState {
  /** Smoothed normalised pointer position, -1..1. */
  pointer: { x: number; y: number }
  /** Raw pointer position from the last event. */
  pointerTarget: { x: number; y: number }
  /** Smoothed assembly rotation. */
  rotation: { x: number; y: number }
  /** Rotation the user has dragged to (or the idle spin target). */
  rotationTarget: { x: number; y: number }
  dragging: boolean
  dragStartX: number
  dragStartY: number
  dragStartRotX: number
  dragStartRotY: number
}

export function createSceneState(): SceneState {
  return {
    pointer: { x: 0, y: 0 },
    pointerTarget: { x: 0, y: 0 },
    rotation: { x: 0, y: 0 },
    rotationTarget: { x: 0, y: 0 },
    dragging: false,
    dragStartX: 0,
    dragStartY: 0,
    dragStartRotX: 0,
    dragStartRotY: 0,
  }
}
