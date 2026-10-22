import { drawBat, isOffscreen, spawnBat, updateBat } from './bat'
import { buildCastle, drawCastle } from './castle'
import { buildMist, drawMist } from './mist'
import { buildMoon, drawMoon } from './moon'
import { createStars, drawStars } from './stars'

const MAX_DPR = 2
const MAX_FRAME_TIME = 0.05
const MIN_BATS = 6
const MAX_BATS = 16
const PIXELS_PER_BAT = 90000
/** Vertical-only resizes smaller than this (mobile address bar) are ignored. */
const RESIZE_HEIGHT_TOLERANCE = 140
/** Scenery fades to this opacity once the page is scrolled past the hero. */
const MIN_SCENERY_ALPHA = 0.25

/**
 * Night scene drawn on a canvas: stars, a moon, a castle with flickering
 * windows, drifting mist and bats that veer away from the pointer.
 * Returns a handle to tear it down.
 */
export function createNightScene(canvas) {
  const ctx = canvas.getContext('2d')
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const view = { width: 0, height: 0, dpr: 1 }
  const pointer = { x: -9999, y: -9999 }
  let stars = []
  let bats = []
  let moon, castle, mist
  let frameId = 0
  let lastTime = 0
  let scrollY = 0

  const sceneryAlpha = () => Math.max(MIN_SCENERY_ALPHA, 1 - scrollY / (view.height * 1.1))

  function render(time, dt) {
    const alpha = sceneryAlpha()
    ctx.clearRect(0, 0, view.width, view.height)
    drawStars(ctx, stars, time, alpha)
    drawMoon(ctx, moon, time, alpha)
    drawCastle(ctx, castle, time, alpha)
    drawMist(ctx, mist, time, alpha)

    for (const bat of bats) {
      if (dt) {
        updateBat(bat, dt, pointer, view)
        if (isOffscreen(bat, view)) spawnBat(bat, view)
      }
      drawBat(ctx, bat)
    }
  }

  function resize() {
    const { innerWidth, innerHeight } = window
    const heightOnly = innerWidth === view.width && Math.abs(innerHeight - view.height) < RESIZE_HEIGHT_TOLERANCE
    if (heightOnly) return

    view.dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
    view.width = innerWidth
    view.height = innerHeight
    canvas.width = innerWidth * view.dpr
    canvas.height = innerHeight * view.dpr
    ctx.setTransform(view.dpr, 0, 0, view.dpr, 0, 0)

    moon = buildMoon(view)
    castle = buildCastle(view)
    mist = buildMist(view)
    stars = createStars(view)

    const count = Math.round(Math.min(MAX_BATS, Math.max(MIN_BATS, (innerWidth * innerHeight) / PIXELS_PER_BAT)))
    bats = Array.from({ length: count }, () => spawnBat({}, { ...view, scattered: true }))
    bats.forEach((bat) => {
      bat.y = bat.baseY
    })

    if (reducedMotion) render(0, 0)
  }

  function frame(time) {
    const dt = Math.min((time - lastTime) / 1000 || 0.016, MAX_FRAME_TIME)
    lastTime = time
    render(time, dt)
    frameId = requestAnimationFrame(frame)
  }

  const onPointerMove = (e) => {
    pointer.x = e.clientX
    pointer.y = e.clientY
  }
  const onScroll = () => {
    scrollY = window.scrollY
  }

  resize()
  window.addEventListener('resize', resize)
  if (!reducedMotion) {
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    frameId = requestAnimationFrame(frame)
  }

  return {
    destroy() {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', onScroll)
    },
  }
}
