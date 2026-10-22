import { MIST_RGB } from './palette'
import { createRandom } from './random'

const SEED = 5
const HEIGHT_RATIO = 0.36
/** Blobs are flattened vertically so mist reads as horizontal banks. */
const SQUASH = 0.38

const LAYERS = [
  { speed: 9, alpha: 0.22, blobs: 9, lift: 0 },
  { speed: 16, alpha: 0.16, blobs: 7, lift: 0.1 },
  { speed: 27, alpha: 0.12, blobs: 6, lift: 0.2 },
]

/** Each layer is a horizontally wrapping strip of soft blobs, scrolled in the loop. */
export function buildMist({ width, height, dpr }) {
  const mistHeight = height * HEIGHT_RATIO
  const rand = createRandom(SEED)

  return LAYERS.map((layer) => {
    const canvas = document.createElement('canvas')
    canvas.width = width * dpr
    canvas.height = mistHeight * dpr
    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)

    for (let i = 0; i < layer.blobs; i++) {
      const x = rand() * width
      const radius = width * (0.12 + rand() * 0.14)
      const ry = radius * SQUASH
      const y = ry + rand() * (mistHeight - ry * 2)
      // Draw the blob three times so it wraps seamlessly at both edges.
      for (const shift of [-width, 0, width]) {
        ctx.save()
        ctx.translate(x + shift, y)
        ctx.scale(1, SQUASH)
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius)
        gradient.addColorStop(0, `rgba(${MIST_RGB}, ${layer.alpha})`)
        gradient.addColorStop(1, `rgba(${MIST_RGB}, 0)`)
        ctx.fillStyle = gradient
        ctx.fillRect(-radius, -radius, radius * 2, radius * 2)
        ctx.restore()
      }
    }
    return { canvas, speed: layer.speed, lift: layer.lift * mistHeight, width, height: mistHeight, top: height - mistHeight }
  })
}

export function drawMist(ctx, layers, time, alpha) {
  ctx.globalAlpha = alpha
  for (const layer of layers) {
    const offset = ((time / 1000) * layer.speed) % layer.width
    const y = layer.top - layer.lift
    ctx.drawImage(layer.canvas, -offset, y, layer.width, layer.height)
    ctx.drawImage(layer.canvas, layer.width - offset, y, layer.width, layer.height)
  }
  ctx.globalAlpha = 1
}
