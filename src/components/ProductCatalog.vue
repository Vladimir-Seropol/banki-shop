<template>
  <section class="catalog">
    <div class="container">
      <div class="catalog__body">
        <h1 class="catalog__title">Картины эпохи Возрождения</h1>

        <div v-if="filteredProducts.length" class="catalog__grid">
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
            :buy-state="cartStates[product.id] || 'idle'"
            @buy="$emit('buy', $event)"
            @open="$emit('open', $event)"
          />
        </div>

        <p v-else class="catalog__empty">По вашему запросу ничего не найдено</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { CartStates, Product } from '@/types/product';
import ProductCard from './ProductCard.vue';

export default Vue.extend({
  name: 'ProductCatalog',
  components: { ProductCard },
  props: {
    products: {
      type: Array as PropType<Product[]>,
      required: true,
    },
    searchQuery: {
      type: String,
      default: '',
    },
    cartStates: {
      type: Object as PropType<CartStates>,
      required: true,
    },
  },
  computed: {
    filteredProducts(): Product[] {
      const query = this.searchQuery.trim().toLowerCase();
      if (!query) return this.products;

      return this.products.filter((product) =>
        product.title.toLowerCase().includes(query),
      );
    },
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.catalog {
  flex: 1;

  &__title {
    margin: 45px 0 35px 4px;
    text-align: left;
  }

  &__grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  &__empty {
    padding: 40px 0;
    text-align: center;
    color: $primary-disable;
  }
}

@media screen and (max-width: 1285px) {
  .catalog__body {
    padding: 0 15px;
  }
}

@media screen and (max-width: 1035px) {
  .catalog__grid {
    justify-content: center;
    gap: 8px;
  }
}

@media screen and (max-width: 666px) {
  .catalog__title {
    margin: 30px 0 15px;
    text-align: center;
  }

  .catalog__grid {
    justify-content: center;
  }
}

@media screen and (max-width: 360px) {
  .catalog__title {
    font-size: 20px;
    line-height: 30px;
  }
}
</style>
