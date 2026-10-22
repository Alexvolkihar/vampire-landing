<template>
  <header class="header">
    <a href="#top" class="logo"><span class="seal">V</span> Nocturne</a>
    <nav>
      <a href="#legende" class="nav-link">Légende</a>
      <a href="#veilles" class="nav-link">Les trois veilles</a>
      <a href="#cercle" class="pill">Entrer</a>
    </nav>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.4rem clamp(1.2rem, 4vw, 3.5rem);
  font-size: 0.9rem;
}
nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}
a {
  position: relative;
}
.logo {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-family: var(--serif);
  font-size: 1.3rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.seal {
  display: inline-grid;
  place-items: center;
  width: 1.9rem;
  height: 1.9rem;
  border: 1px solid var(--blood);
  border-radius: 50%;
  color: var(--blood);
  font-size: 1.05rem;
  letter-spacing: 0;
}
.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 100%;
  height: 1px;
  background: var(--blood);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s var(--ease);
}
.nav-link:hover::after {
  transform: scaleX(1);
}
.pill {
  padding: 0.45rem 1.1rem;
  border: 1px solid var(--bone-dim);
  border-radius: 99px;
  transition: background 0.3s, border-color 0.3s;
}
.pill:hover {
  border-color: var(--blood);
  background: var(--blood-deep);
}

@media (max-width: 700px) {
  .nav-link {
    display: none;
  }
}
</style>
