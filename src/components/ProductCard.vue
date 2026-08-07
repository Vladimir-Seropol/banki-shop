<template>
  <article class="product-card" :class="{ 'product-card--sold': product.isSold }">
    <div class="product-card__img" @click="openModal">
      <img :src="previewImage" :alt="product.title" />
    </div>

    <div class="product-card__body">
      <h2 class="product-card__title" @click="openModal">{{ product.title }}</h2>

      <div class="product-card__foot">
        <div v-if="!product.isSold" class="product-card__price">
          <h6 v-if="product.oldPrice" class="product-card__old-price">{{ product.oldPrice }} $</h6>
          <h3>{{ product.newPrice }} $</h3>
        </div>

        <h5 v-if="product.isSold" class="product-card__sold">Продана на аукционе</h5>
        <BuyButton
          v-else
          :state="buyState"
          @buy="$emit('buy', product.id)"
        />
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { BuyState, Product } from '@/types/product';
import { getImageUrl } from '@/data/products';
import BuyButton from './BuyButton.vue';

export default Vue.extend({
  name: 'ProductCard',
  components: { BuyButton },
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
    buyState: {
      type: String as PropType<BuyState>,
      default: 'idle',
    },
  },
  computed: {
    previewImage(): string {
      return getImageUrl(this.product.images[0]);
    },
  },
  methods: {
    openModal(): void {
      this.$emit('open', this.product);
    },
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.product-card {
  max-width: 280px;
  min-height: 328px;
  width: 100%;
  margin: 5px;

  &--sold {
    opacity: 0.5;
  }

  &__img {
    cursor: pointer;

    img {
      width: 100%;
      height: 160px;
      object-fit: cover;
      display: block;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    min-height: 170px;
    border: 1px solid $secondary-disable;
    background-color: #fff;
  }

  &__title {
    cursor: pointer;
    padding: 20px 24px 0;
    flex: 1;
  }

  &__foot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 23px;
    gap: 20px;
  }

  &__price {
    flex: 0 0 auto;
  }

  &__old-price {
    text-decoration-line: line-through;
    margin-bottom: 4px;
  }

  &__sold {
    color: $primary-disable;
    white-space: nowrap;
  }
}

@media screen and (max-width: 360px) {
  .product-card {
    max-width: 100%;
    margin: 0 0 16px;
  }

  .product-card__foot {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
  }
}
</style>