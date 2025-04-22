<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  elements: {
    type: Array,
    default: () => []
  }
})

const expanded = ref(false)
</script>

<template>
  <div class="controller-diagram" :class="{ expanded }">
    <div v-for="(item, index) in elements" :key="index" class="diagram-item">
      <div class="item-marker">{{ index + 1 }}</div>
      <div class="item-info">
        <h4>{{ item.name }}</h4>
        <p>{{ item.description }}</p>
      </div>
    </div>
    <button class="expand-btn" @click="expanded = !expanded">
      {{ expanded ? 'Свернуть' : 'Развернуть' }}
    </button>
  </div>
</template>

<style scoped>
.controller-diagram {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  transition: all 0.3s ease;
}

.controller-diagram.expanded {
  transform: scale(1.05);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  background: white;
  z-index: 10;
  position: relative;
}

.expand-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  margin-top: 15px;
  cursor: pointer;
  font-size: 14px;
}

.expand-btn:hover {
  background: #2980b9;
}
</style>