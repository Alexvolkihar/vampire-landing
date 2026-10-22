<template>
  <section id="cercle" class="circle">
    <div v-reveal class="seal" aria-hidden="true">V</div>
    <h2 v-reveal>Rejoindre<br />le cercle</h2>
    <p v-reveal>Laissez votre adresse. Nous vous écrivons à la tombée de la nuit.</p>
    <!-- Demo only: the form is not wired to any backend. -->
    <form v-reveal @submit.prevent>
      <input type="email" placeholder="vous@exemple.fr" aria-label="Adresse e-mail" required />
      <button class="btn" type="submit">Me convier</button>
    </form>
  </section>
</template>

<style scoped>
.circle {
  padding: clamp(6rem, 14vw, 12rem) 1.2rem;
  text-align: center;
  background: linear-gradient(rgba(10, 6, 8, 0.72), var(--night));
}
.seal {
  display: grid;
  place-items: center;
  width: 4.4rem;
  height: 4.4rem;
  margin: 0 auto 2rem;
  border: 1px solid var(--blood);
  border-radius: 50%;
  color: var(--blood);
  font-family: var(--serif);
  font-size: 2.2rem;
  font-style: italic;
}
h2 {
  margin-bottom: 1.2rem;
  font-family: var(--serif);
  font-size: clamp(2.4rem, 6.4vw, 5rem);
  font-weight: 500;
  line-height: 1.1;
}
p {
  max-width: 28rem;
  margin: 0 auto 2.2rem;
  color: var(--bone-dim);
}
form {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8rem;
}
input {
  min-width: min(20rem, 100%);
  padding: 1rem 1.2rem;
  border: 0;
  border-bottom: 1px solid var(--bone-dim);
  border-radius: 0;
  outline: none;
  background: transparent;
  color: inherit;
  font: inherit;
  transition: border-color 0.3s;
}
input::placeholder {
  color: rgba(168, 157, 138, 0.6);
}
input:focus-visible {
  border-color: var(--blood);
}
</style>
