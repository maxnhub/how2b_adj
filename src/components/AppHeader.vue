<script setup>
import BurgerMenu from './BurgerMenu.vue'
</script>

<template>
  <header class="app-header">
    <div class="header-content">
      <BurgerMenu />
      <h1>How 2B a DJ</h1>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background-color: #000;
  color: white;
  padding: 20px;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  margin: 0;
  font-size: 24px;
  margin-left: 20px;
}
</style>