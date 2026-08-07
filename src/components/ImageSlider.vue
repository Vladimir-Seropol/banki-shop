<template>
  <div class="slider">
    <div class="slider__viewport">
      <div class="slider__track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div v-for="(image, index) in images" :key="index" class="slider__slide">
          <img :src="image" :alt="`${alt} — фото ${index + 1}`" />
        </div>
      </div>
    </div>

    <div v-if="images.length > 1" class="slider__controls">
      <button class="slider__btn btn" type="button" aria-label="Предыдущее фото" @click="prev">
        &#8249;
      </button>
      <div class="slider__dots">
        <button
          v-for="(_, index) in images"
          :key="index"
          class="slider__dot"
          :class="{ 'slider__dot--active': index === currentIndex }"
          type="button"
          :aria-label="`Фото ${index + 1}`"
          @click="goTo(index)"
        />
      </div>
      <button class="slider__btn btn" type="button" aria-label="Следующее фото" @click="next">
        &#8250;
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ImageSlider',
  props: {
    images: {
      type: Array as () => string[],
      required: true,
    },
    alt: {
      type: String,
      default: 'Изображение товара',
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  watch: {
    images() {
      this.currentIndex = 0;
    },
  },
  methods: {
    prev(): void {
      this.currentIndex =
        this.currentIndex > 0 ? this.currentIndex - 1 : this.images.length - 1;
    },
    next(): void {
      this.currentIndex =
        this.currentIndex < this.images.length - 1 ? this.currentIndex + 1 : 0;
    },
    goTo(index: number): void {
      this.currentIndex = index;
    },
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.slider {
  width: 100%;

  &__viewport {
    overflow: hidden;
    width: 100%;
    background-color: $secondary-disable;
  }

  &__track {
    display: flex;
    transition: transform 0.3s ease;
  }

  &__slide {
    flex: 0 0 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 280px;

    img {
      width: 100%;
      height: auto;
      max-height: 400px;
      object-fit: contain;
    }
  }

  &__controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-top: 16px;
  }

  &__btn {
    padding: 5px 15px;
    min-width: auto;
    background-color: $primary-hover;
  }

  &__dots {
    display: flex;
    gap: 8px;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: $primary-disable;
    padding: 0;
    cursor: pointer;
    transition: background-color 0.2s;

    &--active {
      background-color: $primary;
    }
  }
}

@media screen and (max-width: 555px) {
  .slider__slide {
    min-height: 200px;

    img {
      max-height: 250px;
    }
  }
}
</style>
