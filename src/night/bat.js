import { BAT_COLOR } from './palette'

const REPEL_RADIUS = 150
const REPEL_STRENGTH = 4

/** Resets a bat in place. Bats cross the screen in either direction. */
export function spawnBat(bat, { width, height, scattered }) {
  const direction = Math.random() < 0.5 ? -1 : 1
  return Object.assign(bat, {
    direction,
    x: scattered ? Math.random() * width : direction > 0 ? -60 : width + 60,
    baseY: height * (0.08 + Math.random() * 0.55),
    y: 0,
    size: 9 + Math.random() * 16,
    speed: 50 + Math.random() * 90,
    wobbleAmplitude: 18 + Math.random() * 46,
    wobbleSpeed: 0.8 + Math.random() * 1.6,
    wobblePhase: Math.random() * Math.PI * 2,
    flapSpeed: 9 + Math.random() * 7,
    flapPhase: Math.random() * Math.PI * 2,
  })
}

/** Moves a bat along its path; bats veer away from the pointer. */
export function updateBat(bat, dt, pointer, bounds) {
  bat.x += bat.direction * bat.speed * dt
  bat.wobblePhase += bat.wobbleSpeed * dt
  bat.flapPhase += bat.flapSpeed * dt

  const dx = bat.x - pointer.x
  const dy = bat.y - pointer.y
  const distance = Math.hypot(dx, dy)
  if (distance < REPEL_RADIUS && distance > 0) {
    const push = (REPEL_RADIUS - distance) * REPEL_STRENGTH * dt
    bat.x += (dx / distance) * push
    bat.baseY = Math.min(Math.max(bat.baseY + (dy / distance) * push, 30), bounds.height * 0.8)
  }
  bat.y = bat.baseY + Math.sin(bat.wobblePhase) * bat.wobbleAmplitude
}

export function isOffscreen(bat, { width }) {
  return bat.direction > 0 ? bat.x > width + 80 : bat.x < -80
}

/** Silhouette with scalloped wings; `flap` in [-1, 1] raises and lowers the wing tips. */
export function drawBat(ctx, bat) {
  const flap = Math.sin(bat.flapPhase)
  const s = bat.size

  ctx.save()
  ctx.translate(bat.x, bat.y)
  ctx.scale(bat.direction, 1)
  ctx.fillStyle = BAT_COLOR

  for (const side of [-1, 1]) {
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.quadraticCurveTo(side * s * 0.8, -s * (0.95 + 0.6 * flap), side * s * 1.65, -s * (0.45 + 0.9 * flap))
    ctx.quadraticCurveTo(side * s * 1.5, s * (0.05 - 0.35 * flap), side * s * 1.15, s * (0.2 - 0.45 * flap))
    ctx.quadraticCurveTo(side * s * 0.95, s * (0.05 - 0.2 * flap), side * s * 0.62, s * (0.3 - 0.3 * flap))
    ctx.quadraticCurveTo(side * s * 0.4, s * 0.15, 0, s * 0.38)
    ctx.fill()
  }

  ctx.beginPath()
  ctx.ellipse(0, s * 0.1, s * 0.2, s * 0.38, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.moveTo(-s * 0.16, -s * 0.22)
  ctx.lineTo(-s * 0.1, -s * 0.5)
  ctx.lineTo(0, -s * 0.28)
  ctx.lineTo(s * 0.1, -s * 0.5)
  ctx.lineTo(s * 0.16, -s * 0.22)
  ctx.fill()
  ctx.restore()
}
