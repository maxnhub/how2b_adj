<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['click'])
</script>

<template>
  <button class="nav-button" @click="emit('click')">
    <slot>Далее →</slot>
  </button>
</template>

<style scoped>
.nav-button {
  background: linear-gradient(135deg, #3498db, #2c3e50);
  color: white;
  border: none;
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  width: auto;
  display: inline-block;
}

.nav-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
  background: linear-gradient(135deg, #2980b9, #1a252f);
}

.nav-button:active {
  transform: translateY(0);
}
</style>