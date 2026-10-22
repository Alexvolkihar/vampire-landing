<template>
  <section id="legende" class="legend">
    <div class="inner">
      <p v-reveal class="eyebrow">La légende</p>
      <blockquote v-reveal>
        On ne craint pas ce qui meurt,<br />mais ce qui <em>refuse</em> de le faire.
      </blockquote>
      <p v-reveal class="body">
        Depuis des siècles, les veillées racontent la même histoire : un hôte raffiné, des fenêtres allumées
        trop tard, un reflet absent du miroir. Le vampire n’est pas seulement un monstre. C’est notre peur du
        temps, retournée en séduction.
      </p>
    </div>
  </section>
</template>

<style scoped>
.legend {
  padding: clamp(6rem, 16vw, 14rem) clamp(1.2rem, 8vw, 8rem);
  background: linear-gradient(transparent, rgba(10, 6, 8, 0.72));
}
.inner {
  max-width: 52rem;
  margin-inline: auto;
}
blockquote {
  margin-bottom: 2.4rem;
  font-family: var(--serif);
  font-size: clamp(2rem, 4.8vw, 3.8rem);
  font-weight: 500;
  line-height: 1.25;
}
em {
  color: var(--blood);
}
.body {
  max-width: 36rem;
  font-size: 1.05rem;
  color: var(--bone-dim);
}
</style>
