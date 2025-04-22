<script setup>
import AppHeader from './components/AppHeader.vue'
import LessonView from './components/LessonView.vue'
</script>

<template>
  <div class="app">
    <AppHeader />
    <main>
      <LessonView />
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
}

:deep(.controller-image) {
  width: 300px;
  border-radius: 8px;
  border: 1px solid #eee;
  cursor: pointer;
  transition: transform 0.2s;
}

:deep(.controller-image:hover) {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.lesson-content img {
  cursor: pointer;
  transition: transform 0.2s;
  max-width: 100%;
  border-radius: 8px;
  margin: 15px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.lesson-content img:hover {
  transform: scale(1.02);
}

:deep(.lesson-content img) {
  cursor: pointer;
  transition: transform 0.2s;
  max-width: 100%;
  border-radius: 8px;
  margin: 15px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

:deep(.lesson-content img:hover) {
  transform: scale(1.02);
}
</style>