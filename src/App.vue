<script setup>
import NightCanvas from './components/NightCanvas.vue'
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import LegendSection from './components/LegendSection.vue'
import VigilsSection from './components/VigilsSection.vue'
import CircleSection from './components/CircleSection.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <NightCanvas />
  <SiteHeader />
  <main>
    <HeroSection />
    <LegendSection />
    <VigilsSection />
    <CircleSection />
  </main>
  <SiteFooter />
</template>
