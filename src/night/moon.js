import { MOON_LIGHT, MOON_SHADE } from './palette'
import { createRandom } from './random'

const SEED = 13
const CRATERS = 9

/** Paints the moon disc once (with craters) and remembers where it sits. */
export function buildMoon({ width, height, dpr }) {
  const radius = Math.min(Math.max(width * 0.085, 46), 118)
  const x = width * (width < 700 ? 0.7 : 0.78)
  const y = height * (width < 700 ? 0.17 : 0.24)

  const size = Math.ceil(radius * 2)
  const disc = document.createElement('canvas')
  disc.width = size * dpr
  disc.height = size * dpr
  const ctx = disc.getContext('2d')
  ctx.scale(dpr, dpr)

  const gradient = ctx.createRadialGradient(radius * 0.8, radius * 0.75, radius * 0.1, radius, radius, radius)
  gradient.addColorStop(0, '#fffaf0')
  gradient.addColorStop(1, MOON_LIGHT)
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.arc(radius, radius, radius, 0, Math.PI * 2)
  ctx.fill()

  const rand = createRandom(SEED)
  ctx.save()
  ctx.beginPath()
  ctx.arc(radius, radius, radius, 0, Math.PI * 2)
  ctx.clip()
  ctx.fillStyle = MOON_SHADE
  for (let i = 0; i < CRATERS; i++) {
    const angle = rand() * Math.PI * 2
    const distance = rand() * radius * 0.8
    ctx.beginPath()
    ctx.arc(
      radius + Math.cos(angle) * distance,
      radius + Math.sin(angle) * distance,
      radius * (0.05 + rand() * 0.16),
      0,
      Math.PI * 2,
    )
    ctx.fill()
  }
  ctx.restore()

  return { disc, x, y, radius }
}

export function drawMoon(ctx, moon, time, alpha) {
  const { x, y, radius } = moon
  const pulse = 0.2 + Math.sin(time / 2400) * 0.04

  const halo = ctx.createRadialGradient(x, y, radius * 0.8, x, y, radius * 4.2)
  halo.addColorStop(0, `rgba(241, 234, 215, ${pulse * alpha})`)
  halo.addColorStop(1, 'rgba(241, 234, 215, 0)')
  ctx.fillStyle = halo
  ctx.fillRect(x - radius * 4.2, y - radius * 4.2, radius * 8.4, radius * 8.4)

  ctx.globalAlpha = alpha
  ctx.drawImage(moon.disc, x - radius, y - radius, radius * 2, radius * 2)
  ctx.globalAlpha = 1
}
