import { SILHOUETTE, WINDOW_GLOW } from './palette'
import { createRandom } from './random'

const SEED = 21
const MAX_HEIGHT = 380
const HEIGHT_RATIO = 0.42

/**
 * Paints a hilltop castle silhouette once, offscreen. Lit windows are
 * returned separately so the scene can make them flicker.
 */
export function buildCastle({ width, height, dpr }) {
  const castleHeight = Math.min(height * HEIGHT_RATIO, MAX_HEIGHT)
  const canvas = document.createElement('canvas')
  canvas.width = width * dpr
  canvas.height = castleHeight * dpr

  const ctx = canvas.getContext('2d')
  ctx.scale(dpr, dpr)
  ctx.fillStyle = SILHOUETTE

  const rand = createRandom(SEED)
  const windows = []
  const groundY = castleHeight

  // Rolling hill under the castle.
  ctx.beginPath()
  ctx.moveTo(0, groundY)
  ctx.lineTo(0, groundY * 0.86)
  ctx.bezierCurveTo(width * 0.25, groundY * 0.78, width * 0.45, groundY * 0.7, width * 0.66, groundY * 0.6)
  ctx.bezierCurveTo(width * 0.82, groundY * 0.55, width * 0.92, groundY * 0.68, width, groundY * 0.64)
  ctx.lineTo(width, groundY)
  ctx.fill()

  const unit = Math.min(Math.max(width / 1400, 0.55), 1)
  const baseX = width * (width < 700 ? 0.5 : 0.66)
  const baseY = groundY * 0.64

  function addWindows(x, top, towerWidth, towerHeight, count) {
    for (let i = 0; i < count; i++) {
      windows.push({
        x: x + towerWidth * (0.3 + rand() * 0.2),
        y: top + towerHeight * (0.15 + (i / count) * 0.6 + rand() * 0.08),
        w: Math.max(3, towerWidth * 0.14),
        h: Math.max(5, towerWidth * 0.26),
        phase: rand() * Math.PI * 2,
      })
    }
  }

  function tower(x, towerWidth, towerHeight, roof) {
    const top = baseY - towerHeight
    ctx.fillRect(x, top, towerWidth, towerHeight + 12)
    if (roof) {
      ctx.beginPath()
      ctx.moveTo(x - towerWidth * 0.12, top)
      ctx.lineTo(x + towerWidth / 2, top - towerWidth * 1.5)
      ctx.lineTo(x + towerWidth * 1.12, top)
      ctx.fill()
    } else {
      const merlon = towerWidth / 7
      for (let i = 0; i < 7; i += 2) ctx.fillRect(x + i * merlon, top - merlon * 1.1, merlon, merlon * 1.1)
    }
    addWindows(x, top, towerWidth, towerHeight, 1 + Math.floor(rand() * 3))
  }

  // Central keep flanked by towers of varying height.
  const keepWidth = 120 * unit
  ctx.fillRect(baseX - keepWidth / 2 - 40 * unit, baseY - 70 * unit, keepWidth + 80 * unit, 90 * unit)
  tower(baseX - keepWidth / 2, keepWidth, 150 * unit, false)
  tower(baseX - keepWidth / 2 - 90 * unit, 48 * unit, 170 * unit, true)
  tower(baseX + keepWidth / 2 + 44 * unit, 54 * unit, 210 * unit, true)
  tower(baseX + keepWidth / 2 - 8 * unit, 34 * unit, 110 * unit, true)
  tower(baseX - keepWidth / 2 - 150 * unit, 36 * unit, 100 * unit, false)

  return { canvas, windows, width, height: castleHeight, top: height - castleHeight }
}

export function drawCastle(ctx, castle, time, alpha) {
  ctx.globalAlpha = alpha
  ctx.drawImage(castle.canvas, 0, castle.top, castle.width, castle.height)

  ctx.fillStyle = WINDOW_GLOW
  for (const w of castle.windows) {
    ctx.globalAlpha = (0.6 + Math.sin(time / 650 + w.phase) * 0.25) * alpha
    ctx.fillRect(w.x, castle.top + w.y, w.w, w.h)
  }
  ctx.globalAlpha = 1
}
