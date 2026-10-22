<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { createNightScene } from '../night/scene'

const canvas = ref(null)
let scene

onMounted(() => {
  scene = createNightScene(canvas.value)
})
onBeforeUnmount(() => scene?.destroy())
</script>

<template>
  <canvas ref="canvas" class="night" aria-hidden="true" />
</template>

<style scoped>
.night {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}
</style>
