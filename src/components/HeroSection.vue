<template>
  <section id="top" class="hero">
    <p class="vertical" aria-hidden="true">Noctem · Aeterna</p>

    <div class="copy">
      <p class="eyebrow">Transylvanie · 1897</p>
      <h1>
        <span class="line"><span>La nuit</span></span>
        <span class="line"><span>te <em>réclame</em></span></span>
      </h1>
      <p class="lead">
        Un château sur la crête, une lune trop pleine, et quelque chose qui bat des ailes au-dessus de la
        brume. Entre, la porte est déjà ouverte.
      </p>
      <div class="actions">
        <a href="#cercle" class="btn">Franchir le seuil</a>
        <a href="#legende" class="link">Lire la légende →</a>
      </div>
    </div>

    <div class="scroll-cue" aria-hidden="true"><span /></div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: grid;
  align-items: center;
  min-height: 100svh;
  padding: 7rem clamp(1.2rem, 8vw, 8rem) 4rem;
}
.copy {
  max-width: 46rem;
}

h1 {
  font-family: var(--serif);
  font-size: clamp(3rem, 9vw, 7.4rem);
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.01em;
}
.line {
  display: block;
  padding-bottom: 0.1em;
  overflow: hidden;
}
.line > span {
  display: block;
  transform: translateY(110%);
  animation: rise 1.3s var(--ease) forwards;
}
.line:nth-child(2) > span {
  animation-delay: 0.15s;
}
em {
  font-style: italic;
  color: var(--blood);
}

.lead,
.actions,
.vertical {
  opacity: 0;
  animation: fade 1.2s var(--ease) forwards;
}
.lead {
  max-width: 34rem;
  margin-top: 2rem;
  font-size: 1.1rem;
  color: var(--bone-dim);
  animation-delay: 0.7s;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2rem;
  margin-top: 2.6rem;
  animation-delay: 0.95s;
}
.link {
  padding-bottom: 2px;
  border-bottom: 1px solid var(--bone-dim);
  transition: color 0.3s, border-color 0.3s;
}
.link:hover {
  color: var(--blood);
  border-color: var(--blood);
}

.vertical {
  position: absolute;
  right: clamp(1.2rem, 4vw, 3.5rem);
  bottom: 14%;
  writing-mode: vertical-rl;
  font-family: var(--serif);
  font-size: 0.95rem;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: var(--bone-dim);
  animation-duration: 1.6s;
  animation-delay: 1.4s;
}

.scroll-cue {
  position: absolute;
  left: 50%;
  bottom: 1.8rem;
  width: 1px;
  height: 3.2rem;
  overflow: hidden;
  background: rgba(233, 223, 204, 0.18);
}
.scroll-cue span {
  display: block;
  width: 100%;
  height: 40%;
  background: var(--bone);
  animation: drip 2.2s var(--ease) infinite;
}

@keyframes rise { to { transform: translateY(0); } }
@keyframes fade { to { opacity: 1; } }
@keyframes drip {
  from { transform: translateY(-100%); }
  to { transform: translateY(260%); }
}

@media (max-width: 700px) {
  .vertical {
    display: none;
  }
}
</style>
