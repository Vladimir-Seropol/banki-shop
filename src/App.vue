<template>
  <div class="wrapper">
    <AppHeader
      :search-query="searchQuery"
      :cart-count="cartCount"
      @search="searchQuery = $event"
    />

    <main class="main">
      <ProductCatalog
        :products="products"
        :search-query="searchQuery"
        :cart-states="cartStates"
        @buy="handleBuy"
        @open="openModal"
      />
    </main>

    <AppFooter />

    <ProductModal
      :product="selectedProduct"
      :visible="isModalOpen"
      :buy-state="selectedBuyState"
      @close="closeModal"
      @buy="handleBuy"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { products } from '@/data/products';
import { countInCart, loadCartStates, saveCartStates } from '@/utils/storage';
import { BuyState, CartStates, Product } from '@/types/product';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import ProductCatalog from '@/components/ProductCatalog.vue';
import ProductModal from '@/components/ProductModal.vue';

export default Vue.extend({
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    ProductCatalog,
    ProductModal,
  },
  data() {
    return {
      products,
      searchQuery: '',
      cartStates: loadCartStates() as CartStates,
      selectedProduct: null as Product | null,
      isModalOpen: false,
      processingTimers: {} as Record<number, number>,
    };
  },
  computed: {
    cartCount(): number {
      return countInCart(this.cartStates);
    },
    selectedBuyState(): BuyState {
      if (!this.selectedProduct) return 'idle';
      return this.cartStates[this.selectedProduct.id] || 'idle';
    },
  },
  beforeDestroy(): void {
    Object.values(this.processingTimers).forEach((timerId) => {
      window.clearTimeout(timerId);
    });
  },
  methods: {
    handleBuy(productId: number): void {
      const product = this.products.find((item) => item.id === productId);
      if (!product || product.isSold) return;

      const currentState = this.cartStates[productId] || 'idle';
      if (currentState !== 'idle') return;

      this.$set(this.cartStates, productId, 'processing');

      const timerId = window.setTimeout(() => {
        this.$set(this.cartStates, productId, 'inCart');
        saveCartStates(this.cartStates);
        delete this.processingTimers[productId];
      }, 2000);

      this.processingTimers[productId] = timerId;
    },
    openModal(product: Product): void {
      this.selectedProduct = product;
      this.isModalOpen = true;
    },
    closeModal(): void {
      this.isModalOpen = false;
      this.selectedProduct = null;
    },
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.wrapper {
  background-color: $bgc;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
