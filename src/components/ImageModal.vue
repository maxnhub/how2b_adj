<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    default: () => [],
    validator: value => value.every(img => img.src && img.alt)
  }
})

const activeImageIndex = ref(null)
const showModal = ref(false)

const hasImages = computed(() => props.images?.length > 0)

const openModal = (index) => {
  activeImageIndex.value = index
  showModal.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  showModal.value = false
  activeImageIndex.value = null
  document.body.style.overflow = ''
}

const navigate = (direction) => {
  const newIndex = activeImageIndex.value + direction
  if (newIndex >= 0 && newIndex < props.images.length) {
    activeImageIndex.value = newIndex
  }
}
</script>

<template>
  <div v-if="hasImages" class="image-gallery">
    <!-- Отображаем все изображения как кликабельные миниатюры -->
    <div 
      v-for="(image, index) in images" 
      :key="index"
      class="thumbnail-wrapper"
    >
      <img
        :src="image.src"
        :alt="image.alt"
        class="clickable-image"
        @click="openModal(index)"
      >
    </div>

    <!-- Модальное окно для просмотра изображения -->
    <div v-if="showModal" class="image-modal" @click.self="closeModal">
      <div class="modal-content">
        <img 
          :src="images[activeImageIndex].src" 
          :alt="images[activeImageIndex].alt"
        >
        
        <!-- Навигационные кнопки -->
        <button 
          v-if="activeImageIndex > 0"
          class="nav-btn prev-btn"
          @click.stop="navigate(-1)"
        >
          ‹
        </button>
        
        <button 
          v-if="activeImageIndex < images.length - 1"
          class="nav-btn next-btn"
          @click.stop="navigate(1)"
        >
          ›
        </button>
        
        <button class="close-btn" @click.stop="closeModal">
          ×
        </button>
        
        <!-- Индикатор текущего изображения -->
        <div class="image-counter">
          {{ activeImageIndex + 1 }} / {{ images.length }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin: 20px 0;
}

.thumbnail-wrapper {
  cursor: pointer;
  transition: transform 0.2s;
}

.thumbnail-wrapper:hover {
  transform: scale(1.03);
}

.clickable-image {
  max-width: 100%;
  max-height: 200px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  text-align: center;
}

.modal-content img {
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 8px;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 40px;
  cursor: pointer;
  padding: 0 15px;
  z-index: 2;
}

.close-btn:hover {
  color: #ccc;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 40px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.nav-btn:hover {
  background: rgba(0, 0, 0, 0.7);
}

.prev-btn {
  left: 20px;
}

.next-btn {
  right: 20px;
}

.image-counter {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 14px;
}
</style>