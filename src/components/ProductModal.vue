<template>
  <transition name="fade">
    <div v-if="visible && product" class="modal-overlay" @click="onOverlayClick">
      <div class="modal" role="dialog" aria-modal="true" :aria-label="product.title" @click.stop>
        <button class="modal__close btn" type="button" @click="close">Закрыть</button>

        <ImageSlider :images="sliderImages" :alt="product.title" />

        <div class="modal__body">
          <h2 class="modal__title">{{ product.title }}</h2>
          <p class="modal__desc">{{ product.description }}</p>

          <div class="modal__foot">
            <div class="modal__price">
              <h6 v-if="product.oldPrice" class="modal__old-price">{{ product.oldPrice }} $</h6>
              <h3>{{ product.newPrice }} $</h3>
            </div>

            <h5 v-if="product.isSold" class="modal__sold">Продана на аукцоне</h5>
            <BuyButton
              v-else
              :state="buyState"
              compact
              @buy="$emit('buy', product.id)"
            />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { BuyState, Product } from '@/types/product';
import { getImageUrl } from '@/data/products';
import ImageSlider from './ImageSlider.vue';
import BuyButton from './BuyButton.vue';

export default Vue.extend({
  name: 'ProductModal',
  components: { ImageSlider, BuyButton },
  props: {
    product: {
      type: Object as PropType<Product | null>,
      default: null,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    buyState: {
      type: String as PropType<BuyState>,
      default: 'idle',
    },
  },
  computed: {
    sliderImages(): string[] {
      if (!this.product) return [];
      return this.product.images.map(getImageUrl);
    },
  },
  watch: {
    visible(value: boolean): void {
      document.body.style.overflow = value ? 'hidden' : '';
    },
  },
  mounted(): void {
    document.addEventListener('keydown', this.onKeydown);
  },
  beforeDestroy(): void {
    document.removeEventListener('keydown', this.onKeydown);
    document.body.style.overflow = '';
  },
  methods: {
    close(): void {
      this.$emit('close');
    },
    onOverlayClick(event: MouseEvent): void {
      if (event.target === event.currentTarget) {
        this.close();
      }
    },
    onKeydown(event: KeyboardEvent): void {
      if (event.key === 'Escape' && this.visible) {
        this.close();
      }
    },
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 2.5vh 16px 24px;
  background-color: rgba(0, 0, 0, 0.5);
  overflow-y: auto;
}

.modal {
  position: relative;
  width: 700px;
  max-width: 100%;
  background-color: $bgc;
  box-shadow: 0 0 15px $primary;

  &__close {
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 2;
    padding: 8px 16px;
    min-width: auto;
  }

  &__body {
    padding: 20px;
  }

  &__title {
    text-align: center;
    margin-bottom: 12px;
  }

  &__desc {
    margin: 0 20px 20px;
    text-align: justify;
  }

  &__foot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px 24px;
    gap: 16px;
  }

  &__old-price {
    text-decoration-line: line-through;
    margin-bottom: 4px;
  }

  &__sold {
    color: $primary-disable;
  }
}

@media screen and (max-width: 757px) {
  .modal__foot {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}

@media screen and (max-width: 555px) {
  .modal__desc {
    margin: 0 0 16px;
  }

  .modal__foot {
    padding: 0 0 16px;
  }
}
</style>
