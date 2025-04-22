<script setup>
import { useLessonsStore } from '../stores/lessons'
const store = useLessonsStore()
</script>

<template>
  <button class="burger-menu" @click="store.toggleMenu">
    <span class="burger-line"></span>
    <span class="burger-line"></span>
    <span class="burger-line"></span>
  </button>

  <div class="menu-overlay" :class="{ open: store.isMenuOpen }" @click="store.toggleMenu">
    <div class="menu-content" @click.stop>
      <h2>Lessons</h2>
      <ul>
        <li v-for="lesson in store.lessons" :key="lesson.id" @click="store.setLesson(lesson.id)">
          {{ lesson.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.burger-menu {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 24px;
  width: 30px;
  padding: 0;
}

.burger-line {
  display: block;
  width: 100%;
  height: 3px;
  background-color: white;
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.menu-overlay.open {
  opacity: 1;
  pointer-events: all;
}

.menu-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  background-color: #111;
  color: white;
  padding: 20px;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.menu-overlay.open .menu-content {
  transform: translateX(0);
}

h2 {
  color: #ff0;
  margin-bottom: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 10px 0;
  cursor: pointer;
  border-bottom: 1px solid #333;
}

li:hover {
  color: #ff0;
}
</style>