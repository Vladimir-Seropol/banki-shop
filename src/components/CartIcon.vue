<template>
  <div v-if="count > 0" class="cart-icon">
    <img src="/inCart.png" alt="Корзина" width="24" height="24" />
    <span class="cart-icon__count">{{ count }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'CartIcon',
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.cart-icon {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  img {
    display: block;
    width: 24px;
    height: 24px;
  }

  &__count {
    position: absolute;
    background-color: $primary-hover;
    color: $font-light;
    border-radius: 50%;
    min-width: 18px;
    height: 18px;
    right: -8px;
    top: -8px;
    font-size: 10px;
    font-weight: 600;
    text-align: center;
    line-height: 18px;
    padding: 0 4px;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease;
    animation: popIn 0.3s ease;
  }
}

@keyframes popIn {
  0% {
    transform: scale(0);
  }
  80% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>