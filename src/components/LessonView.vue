<script setup>
import { useLessonsStore } from '../stores/lessons'
import NavigationButton from './NavigationButton.vue'
import { ref, onMounted, watch } from 'vue'

const store = useLessonsStore()
const modalImages = ref([])
const showImageModal = ref(false)
const currentImageIndex = ref(0)
const touchStartX = ref(0)
const touchEndX = ref(0)

// Извлекаем все изображения из контента урока
const extractImagesFromContent = () => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(store.currentLesson.content, 'text/html')
  const images = Array.from(doc.querySelectorAll('img'))
    .filter(img => img.src && !img.src.startsWith('data:')) // Исключаем data-URI
    .map(img => ({
      src: img.src,
      alt: img.alt || 'Изображение урока'
    }))
  
  modalImages.value = images
}

// Открытие модального окна с конкретным изображением
const openImageModal = (index) => {
  currentImageIndex.value = index
  showImageModal.value = true
  document.body.style.overflow = 'hidden'
}

// Закрытие модального окна
const closeImageModal = () => {
  showImageModal.value = false
  document.body.style.overflow = ''
}

// Навигация по изображениям
const navigateImage = (direction) => {
  const newIndex = currentImageIndex.value + direction
  if (newIndex >= 0 && newIndex < modalImages.value.length) {
    currentImageIndex.value = newIndex
  }
}

// Обработчик клика по изображениям в контенте
const handleImageClick = (e) => {
  if (e.target.tagName === 'IMG' && e.target.src && !e.target.src.startsWith('data:')) {
    const index = Array.from(document.querySelectorAll('.lesson-content img'))
      .filter(img => img.src && !img.src.startsWith('data:'))
      .findIndex(img => img === e.target)
    if (index !== -1) {
      openImageModal(index)
    }
  }
}

// Обработчики для свайпа
const handleTouchStart = (e) => {
  touchStartX.value = e.changedTouches[0].screenX
}

const handleTouchEnd = (e) => {
  touchEndX.value = e.changedTouches[0].screenX
  handleSwipe()
}

const handleSwipe = () => {
  if (touchStartX.value - touchEndX.value > 50) {
    navigateImage(1) // Свайп влево
  }
  
  if (touchEndX.value - touchStartX.value > 50) {
    navigateImage(-1) // Свайп вправо
  }
}

// Обновляем изображения при смене урока
watch(() => store.currentLessonId, () => {
  extractImagesFromContent()
})

// Добавляем обработчики после монтирования
onMounted(() => {
  extractImagesFromContent()
  document.querySelector('.lesson-content')?.addEventListener('click', handleImageClick)
})
</script>

<template>
  <div class="lesson-view">
    <div class="lesson-header">
      <h2>{{ store.currentLesson.title }}</h2>
      <div class="lesson-progress">
        Урок {{ store.currentLessonId }} из {{ store.lessons.length }}
      </div>
    </div>
    
    <div 
      class="lesson-content" 
      v-html="store.currentLesson.content"
      @click="handleImageClick"
    ></div>
    
    <NavigationButton 
      v-if="store.hasNextLesson" 
      @click="store.nextLesson"
      class="next-button"
    >
      Следующий урок →
    </NavigationButton>

    <!-- Модальное окно для изображений -->
    <div 
      v-if="showImageModal" 
      class="image-modal" 
      @click.self="closeImageModal"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
    >
      <div class="modal-content">
        <transition name="slide" mode="out-in">
          <img 
            :key="currentImageIndex"
            :src="modalImages[currentImageIndex]?.src" 
            :alt="modalImages[currentImageIndex]?.alt"
            @load="handleImageLoad"
          >
        </transition>
        
        <!-- Миниатюры слайдера -->
        <div v-if="modalImages.length > 1" class="slider-thumbnails">
          <div 
            v-for="(img, index) in modalImages"
            :key="index"
            class="thumbnail"
            :class="{ active: index === currentImageIndex }"
            @click="currentImageIndex = index"
          >
            <img :src="img.src" :alt="img.alt">
          </div>
        </div>
        
        <button class="close-btn" @click.stop="closeImageModal">
          ×
        </button>
        
        <div class="image-counter" v-if="modalImages.length > 1">
          {{ currentImageIndex + 1 }} / {{ modalImages.length }}
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.lesson-view {
  max-width: 1000px;
  margin: 100px auto;
  padding: 30px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.lesson-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

h2 {
  color: #2c3e50;
  font-size: 28px;
  margin: 0;
}

.lesson-progress {
  background: #f5f5f5;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 14px;
  color: #666;
}

.next-button {
  margin-top: 40px;
  display: block;
  width: 100%;
}

:deep(.lesson-content) {
  line-height: 1.7;
  color: #444;
}

:deep(h3) {
  color: #2c3e50;
  margin-top: 25px;
  margin-bottom: 15px;
  font-size: 22px;
}

:deep(ul), :deep(ol) {
  padding-left: 20px;
  margin: 15px 0;
}

:deep(li) {
  margin-bottom: 8px;
}

:deep(.shortcuts-grid) {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  margin: 20px 0;
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
}

:deep(kbd) {
  background: #2c3e50;
  color: white;
  padding: 3px 6px;
  border-radius: 4px;
  font-family: monospace;
}

:deep(.note) {
  background: #fff8e6;
  border-left: 4px solid #ffcc00;
  padding: 12px 15px;
  margin: 20px 0;
  border-radius: 0 4px 4px 0;
}

:deep(a) {
  color: #3498db;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}

:deep(.lesson-image) {
  max-width: 100%;
  border-radius: 8px;
  margin: 15px 0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

:deep(.controller-layout) {
  display: flex;
  gap: 30px;
  margin: 20px 0;
  align-items: center;
}

:deep(.controller-image) {
  width: 300px;
  border-radius: 8px;
  border: 1px solid #eee;
}

:deep(.features) {
  flex: 1;
}

:deep(.video-wrapper) {
  position: relative;
  padding-bottom: 56.25%;
  margin: 25px 0;
}

:deep(.video-wrapper iframe) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

:deep(.mixing-techniques) {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

:deep(.technique) {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

:deep(.technique h4) {
  color: #2c3e50;
  margin-top: 0;
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

.lesson-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

h2 {
  color: #2c3e50;
  font-size: 28px;
  margin: 0;
}

.lesson-progress {
  background: #f5f5f5;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 14px;
  color: #666;
}

.next-button {
  margin-top: 40px;
  display: block;
  width: 100%;
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
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  text-align: center;
}

.modal-content img {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 8px;
  display: block;
  margin: 0 auto;
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

.image-counter {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 14px;
}

.slider-thumbnails {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
  overflow-x: auto;
  padding: 10px 0;
  max-width: 100%;
}

.thumbnail {
  width: 60px;
  height: 60px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.thumbnail:hover {
  opacity: 1;
}

.thumbnail.active {
  opacity: 1;
  border-color: #3498db;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Анимации */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>