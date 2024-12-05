<template>
    <div class="gallery-container">
      <!-- Galerie de Vidéos et Podcasts -->
      <div class="gallery-grid">
        <div
          v-for="(item, index) in mediaItems"
          :key="index"
          class="gallery-item"
          @click="openModal(item)"
        >
          <img :src="item.thumbnail ? `/media/${item.thumbnail}` : require('@/assets/default-thumbnail.jpg')" alt="Thumbnail" class="thumbnail-image" loading="lazy">
          <div v-if="item.type === 'video'" class="play-icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" class="play-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <div class="item-details">
            <h3 class="item-title full-text">{{ item.title }}</h3>
            <p class="item-description full-text">{{ item.description }}</p>
            <p class="item-url full-text">URL: {{ item.url }}</p>
          </div>
        </div>
      </div>
  
      <!-- Modal pour la Lecture -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
          <button @click="closeModal" class="modal-close-button">&times;</button>
          <video v-if="selectedItem.type === 'video'" :src="`/media/${selectedItem.url}`" controls class="media-player"></video>
          <audio v-else :src="`/media/${selectedItem.url}`" controls class="media-player"></audio>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        mediaItems: [
          {
            title: 'Florian Sevellec - Oona Layolle',
            description: 'Vidéo de Florian Sevellec et Oona Layolle',
            thumbnail: 'thumbnail1.jpg',
            url: 'Florian Sevellec - Oona Layolle-001-SD 480p.mov',
            type: 'video',
          },
          {
            title: 'Florian Sevellec Part 4',
            description: 'Vidéo de Florian Sevellec',
            thumbnail: 'thumbnail2.jpg',
            url: 'Florian Sevellec-004-SD 480p.mov',
            type: 'video',
          },
          {
            title: 'Frederic Le Moigne - Partie 1',
            description: 'Vidéo de Frederic Le Moigne - Partie 1',
            thumbnail: 'thumbnail3.jpg',
            url: 'Frederic Le Moigne - Part 1-SD 480p.mov',
            type: 'video',
          },
          {
            title: 'Frederic Le Moigne - Partie 2',
            description: 'Vidéo de Frederic Le Moigne - Partie 2',
            thumbnail: 'thumbnail4.jpg',
            url: 'Frederic Le Moigne - Part 2-SD 480p.mov',
            type: 'video',
          },
          {
            title: 'Podcast Florian Sevellec',
            description: 'Podcast audio de Florian Sevellec',
            thumbnail: 'thumbnail5.jpg',
            url: 'PODCAST-AUDIO-Florian Sévellec.m4a',
            type: 'audio',
          },
          {
            title: 'Podcast Frederic Le Moigne',
            description: 'Podcast audio de Frederic Le Moigne',
            thumbnail: 'thumbnail6.jpg',
            url: 'PODCAST-AUDIO-Frédéric Le Moigne.m4a',
            type: 'audio',
          },
        ],
        showModal: false,
        selectedItem: null,
      };
    },
    methods: {
      openModal(item) {
        this.selectedItem = item;
        this.showModal = true;
      },
      closeModal() {
        this.showModal = false;
        this.selectedItem = null;
      },
    },
  };
  </script>
  
  <style scoped>
  .gallery-container {
    min-height: 100vh;
    background-color: #f3f4f6;
    padding: 2rem;
    overflow-x: hidden;
  }
  
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
    gap: 2rem;
  }
  
  @media (max-width: 768px) {
    .gallery-grid {
      grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
    }
  }
  
  .gallery-item {
    position: relative;
    background-color: #ffffff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s;
    height: auto;
    aspect-ratio: 4 / 3;
  }
  
  .gallery-item:hover {
    transform: scale(1.05);
  }
  
  .thumbnail-image {
    width: 100%;
    height: auto;
    object-fit: cover;
    aspect-ratio: 16 / 9;
  }
  
  .play-icon-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .play-icon {
    width: 4rem;
    height: 4rem;
    color: rgba(255, 255, 255, 0.75);
  }
  
  .item-details {
    padding: 1rem;
  }
  
  .item-title.full-text,
  .item-description.full-text,
  .item-url.full-text {
    white-space: normal;
    overflow: visible;
    text-overflow: unset;
  }
  
  .item-title {
    font-size: 1.125rem;
    font-weight: 600;
  }
  
  .item-description {
    color: #718096;
  }
  
  .item-url {
    color: #4a5568;
    font-size: 0.875rem;
    word-wrap: break-word;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
  }
  
  .modal-content {
    background-color: #ffffff;
    border-radius: 0.5rem;
    overflow: hidden;
    width: 100%;
    max-width: 48rem;
    padding: 1.5rem;
    position: relative;
  }
  
  .modal-close-button {
    position: absolute;
    top: -1rem;
    right: 0;
    background: none;
    border: none;
    padding: 0.5rem;
    color: #718096;
    font-size: 2rem;
    cursor: pointer;
    transition: color 0.2s;
  }
  
  .modal-close-button:hover {
    color: #1a202c;
  }
  
  .media-player {
    width: 100%;
  }
  </style>
