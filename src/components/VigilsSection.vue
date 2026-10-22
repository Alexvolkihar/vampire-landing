<script setup>
import { vigils } from '../content'
</script>

<template>
  <section id="veilles" class="vigils">
    <h2 v-reveal>Les trois veilles</h2>
    <ol>
      <li v-for="(vigil, i) in vigils" :key="vigil.latin" v-reveal="i * 120">
        <span class="numeral" aria-hidden="true">{{ vigil.numeral }}</span>
        <span class="latin">{{ vigil.latin }}</span>
        <h3>{{ vigil.title }}</h3>
        <p>{{ vigil.text }}</p>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.vigils {
  padding: clamp(5rem, 12vw, 10rem) clamp(1.2rem, 8vw, 8rem);
  background: rgba(10, 6, 8, 0.72);
}
h2 {
  margin-bottom: 4rem;
  font-family: var(--serif);
  font-size: clamp(2rem, 4.4vw, 3.4rem);
  font-weight: 500;
  text-align: center;
}
ol {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: clamp(1.5rem, 3vw, 3rem);
  max-width: 70rem;
  margin-inline: auto;
  list-style: none;
}
li {
  padding: 2.4rem 1.8rem 2rem;
  border-top: 1px solid var(--blood);
  background: rgba(21, 10, 18, 0.7);
}
li:nth-child(2) {
  margin-top: 3rem;
}
li.is-visible:hover {
  background: rgba(40, 14, 26, 0.85);
  transform: translateY(-8px);
  transition: transform 0.6s var(--ease), background 0.4s;
}
.numeral {
  display: block;
  font-family: var(--serif);
  font-size: 3.6rem;
  font-style: italic;
  line-height: 1;
  color: var(--blood);
}
.latin {
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--bone-dim);
}
h3 {
  margin: 1.2rem 0 0.6rem;
  font-family: var(--serif);
  font-size: 1.6rem;
  font-weight: 500;
}
li p {
  font-size: 0.98rem;
  color: var(--bone-dim);
}

@media (max-width: 700px) {
  li:nth-child(2) {
    margin-top: 0;
  }
}
</style>
