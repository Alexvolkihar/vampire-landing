import { STAR_RGB } from './palette'

const PIXELS_PER_STAR = 9000
const MAX_STARS = 260

export function createStars({ width, height }) {
  const count = Math.min(MAX_STARS, Math.round((width * height) / PIXELS_PER_STAR))
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height * 0.75,
    radius: 0.4 + Math.random() * 1,
    phase: Math.random() * Math.PI * 2,
    speed: 0.6 + Math.random() * 1.6,
  }))
}

export function drawStars(ctx, stars, time, alpha) {
  for (const star of stars) {
    const twinkle = 0.35 + Math.sin(time / 1000 * star.speed + star.phase) * 0.3
    ctx.fillStyle = `rgba(${STAR_RGB}, ${Math.max(twinkle, 0.05) * alpha})`
    ctx.beginPath()
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
    ctx.fill()
  }
}
