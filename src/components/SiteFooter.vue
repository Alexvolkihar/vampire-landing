<template>
  <footer class="footer">
    <span>© 2026 Nocturne</span>
    <span class="latin">Ad noctem.</span>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  padding: 2rem clamp(1.2rem, 4vw, 3.5rem);
  background: var(--night);
  font-size: 0.85rem;
  color: var(--bone-dim);
}
.latin {
  font-family: var(--serif);
  font-style: italic;
}
</style>
