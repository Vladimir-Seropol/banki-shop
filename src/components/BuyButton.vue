<template>
  <button
    class="buy-btn btn"
    :class="[`buy-btn--${state}`, { 'buy-btn--compact': compact }]"
    :disabled="state !== 'idle'"
    type="button"
    @click="handleClick"
  >
    <span v-if="state === 'idle'" class="buy-btn__content">
      <svg class="buy-btn__icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M1 1h2.2l1.3 6.5H12l2-5H4.5M5 13.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm6 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
          stroke="currentColor"
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Купить
    </span>

    <span v-else-if="state === 'processing'" class="buy-btn__content">
      <AppPreloader />
      Покупка
    </span>

    <span v-else class="buy-btn__content">
      <svg class="buy-btn__icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3 8.5 6.5 12 13 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      В корзине
    </span>
  </button>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { BuyState } from '@/types/product';
import AppPreloader from './AppPreloader.vue';

export default Vue.extend({
  name: 'BuyButton',
  components: { AppPreloader },
  props: {
    state: {
      type: String as PropType<BuyState>,
      required: true,
    },
    compact: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick(): void {
      if (this.state === 'idle') {
        this.$emit('buy');
      }
    },
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.buy-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 112px;
  gap: 8px;
  padding: 13px 32px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: $font-light;
  background-color: $primary;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled):not(.buy-btn--processing):not(.buy-btn--inCart) {
    background-color: rgba(119, 103, 99, 1); 
  }

  &:active:not(:disabled):not(.buy-btn--processing):not(.buy-btn--inCart) {
    transform: scale(0.97);
  }

  &:disabled {
    background-color: rgba(91, 58, 50, 1); 
    cursor: not-allowed;
    pointer-events: none;
  }

  &--compact {
    min-width: auto;
    padding: 13px 24px;
  }

  &--processing {
    background-color: rgba(193, 180, 177, 1); 
    cursor: wait;
    pointer-events: none;

    &:hover {
      background-color: rgba(119, 103, 99, 1); 
    }
  }

  &--inCart {
    background-color: rgba(91, 58, 50, 1); 
    cursor: default;
    pointer-events: none;

    &:hover {
      background-color: rgba(91, 58, 50, 1); 
    }
  }

  &__content {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  &__icon {
    flex-shrink: 0;
  }
}
</style>