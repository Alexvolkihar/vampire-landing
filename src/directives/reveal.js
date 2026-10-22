/**
 * v-reveal: fades an element in the first time it scrolls into view.
 * Optional binding value is a delay in milliseconds.
 */
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target)
    }
  },
  { threshold: 0.18 },
)

export default {
  mounted(el, { value }) {
    el.classList.add('reveal')
    if (value) el.style.setProperty('--reveal-delay', `${value}ms`)
    observer.observe(el)
  },
  unmounted(el) {
    observer.unobserve(el)
  },
}
