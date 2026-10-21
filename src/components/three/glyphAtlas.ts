import * as THREE from 'three'

/**
 * Glyph atlas.
 *
 * A canvas of monospace characters laid out on a grid, uploaded as a texture.
 * The particle shader indexes into it so the drifting field reads as data
 * rather than as generic dots.
 */
const GLYPHS = [
  '0', '1', '<', '>', '/', '{', '}', '[', ']',
  '#', '$', '%', '&', '*', '+', '-', '_',
  '=', '~', '^', '|', '\\', ';', ':', '.',
  ',', 'A', 'F', 'T', 'X', '?', '@',
]

export const ATLAS_COLS = 8
export const ATLAS_ROWS = 5
export const ATLAS_CELL = 64

export function createGlyphAtlas(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = ATLAS_COLS * ATLAS_CELL
  canvas.height = ATLAS_ROWS * ATLAS_CELL

  const context = canvas.getContext('2d')
  if (!context) throw new Error('Unable to create glyph atlas canvas')

  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = '#ffffff'
  context.font = `600 ${Math.round(ATLAS_CELL * 0.6)}px ui-monospace, "JetBrains Mono Variable", SFMono-Regular, Menlo, monospace`
  context.textAlign = 'center'
  context.textBaseline = 'middle'

  for (let index = 0; index < ATLAS_COLS * ATLAS_ROWS; index += 1) {
    const column = index % ATLAS_COLS
    const row = Math.floor(index / ATLAS_COLS)
    context.fillText(
      GLYPHS[index % GLYPHS.length],
      column * ATLAS_CELL + ATLAS_CELL / 2,
      row * ATLAS_CELL + ATLAS_CELL / 2,
    )
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.generateMipmaps = false
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.needsUpdate = true
  return texture
}
