import { defineStore } from 'pinia'

export const useLessonsStore = defineStore('lessons', {
  state: () => ({
    currentLessonId: 1,
    isMenuOpen: false,
    lessons: [
      {
        id: 1,
        title: 'Знакомство с Rekordbox',
        content: `
          <h3>Что такое Rekordbox?</h3>
          <p>Профессиональное ПО от Pioneer DJ для организации и подготовки музыки. Основные функции:</p>
          <ul>
            <li>Анализ треков (BPM, тональность)</li>
            <li>Разметка cue-точек и петель</li>
            <li>Экспорт на USB для CDJ/XDJ</li>
            <li>Режим Performance для живого сведения</li>
          </ul>
          
          <h3>Как начать?</h3>
          <ol>
            <li>Скачайте с <a href="https://rekordbox.com/" target="_blank">официального сайта</a></li>
            <li>Добавьте музыку в библиотеку</li>
            <li>Разметьте треки (cue-точки, loops)</li>
          </ol>
        `,
        audioExample: '/audio/rekordbox-intro.mp3'
      },
      {
        id: 2,
        title: 'Подготовка треков',
        content: `
          <h3>Горячие клавиши для работы:</h3>
          <div class="shortcuts-grid">
            <div><kbd>C</kbd> - Добавить cue-точку</div>
            <div><kbd>Space</kbd> - Воспроизведение/пауза</div>
            <div><kbd>B</kbd> - Установить loop</div>
          </div>
          
          <h3>Советы новичкам:</h3>
          <ul>
            <li>Всегда проверяйте автоматически расставленный BPM</li>
            <li>Размечайте структуру треков (интро, дроп, аутро)</li>
            <li>Используйте цветовые метки для организации</li>
          </ul>
        `,
        audioExample: '/audio/track-preparation.mp3'
      },
      {
        id: 3,
        title: 'Экспорт на USB',
        content: `
          <h3>Для выступления в клубе:</h3>
          <ol>
            <li>Вставьте USB-флешку</li>
            <li>Перейдите в <strong>Export Mode</strong></li>
            <li>Перенесите плейлисты на устройство</li>
          </ol>
          
          <div class="note">
            <p>Форматируйте флешку в FAT32 для совместимости с CDJ!</p>
          </div>
        `,
        audioExample: '/audio/usb-export.mp3'
      },
      {
        id: 4,
        title: 'DDJ-400: Первое знакомство',
        content: `
          <h3>Базовый контроллер для начинающих</h3>
          <div class="controller-layout">
            <img src="https://www.pioneerdj.com/-/media/pioneerdj/images/products/controller/ddj-400sxa/ddj-400_cgi_top_1792x1316.jpg" 
                 alt="DDJ-400 Вид сверху"
                 class="controller-image">
            <img src="https://www.pioneerdj.com/-/media/pioneerdj/images/products/controller/ddj-400sxa/ddj-400_cgi_rear_1792x1316.jpg?dmc=1.jpg" 
                 alt="DDJ-400 Вид сзади"
                 class="controller-image">
            <div class="features">
              <h4>Ключевые элементы:</h4>
              <ul>
                <li><strong>Джоги</strong> - для скретча и поиска</li>
                <li><strong>Фейдеры</strong> - управление громкостью</li>
                <li><strong>Эффекты</strong> - встроенные процессоры</li>
                <li><strong>Кнопки Hot Cues</strong> - быстрый доступ</li>
              </ul>
            </div>
          </div>
        `,
        audioExample: '/audio/ddj-intro.mp3'
      },
      {
        id: 5,
        title: 'Подключение DDJ-400',
        content: `
          <h3>Пошаговая инструкция:</h3>
          <ol>
            <li>Установите драйверы с <a href="https://www.pioneerdj.com/" target="_blank">официального сайта</a></li>
            <li>Подключите контроллер через USB</li>
            <li>Откройте Rekordbox в режиме Performance</li>
            <li>Выберите DDJ-400 в настройках аудио</li>
          </ol>
          
          <div class="video-wrapper">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/G1DcY3dMmsU?si=4eHYxonfjynUoQBR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        `,
        audioExample: '/audio/setup-guide.mp3'
      },
      {
        id: 6,
        title: 'Базовое сведение на DDJ-400',
        content: `
          <h3>Техники для начинающих:</h3>
          <div class="mixing-techniques">
            <div class="technique">
              <h4>1. Beat Matching</h4>
              <p>Совмещение BPM двух треков с помощью джогов</p>
            </div>
            <div class="technique">
              <h4>2. Фейдер-микширование</h4>
              <p>Плавный переход между каналами</p>
            </div>
            <div class="technique">
              <h4>3. Использование эффектов</h4>
              <p>Добавление фильтров и эхо</p>
            </div>
          </div>
        `,
        audioExample: '/audio/mixing-basics.mp3'
      },
      {
        id: 7,
        title: 'Расположение элементов управления',
        content: `
          <h3>Расположение элементов управления:</h3>
          <div class="mixing-techniques">
            <controller-diagram :elements="[
                { name: 'Pitch Fader', description: 'Регулировка темпа трека' },
                { name: 'Cue Buttons', description: 'Метки для быстрого перехода' }
            ]"></controller-diagram>
          </div>
        `,
        audioExample: '/audio/mixing-basics.mp3'
      }
    ]
  }),
  getters: {
    currentLesson: (state) => state.lessons.find(lesson => lesson.id === state.currentLessonId),
    hasNextLesson: (state) => state.currentLessonId < state.lessons.length,
    hasImage:      (state) => state.image
  },
  actions: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    nextLesson() {
      if (this.hasNextLesson) {
        this.currentLessonId++
      }
    },
    setLesson(id) {
      this.currentLessonId = id
      this.isMenuOpen = false
    }
  }
})