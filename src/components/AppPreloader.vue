<template>
  <div class="preloader" aria-hidden="true">
    <svg class="preloader__image" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="currentColor" stroke-width="2" stroke-dasharray="32" stroke-linecap="round" />
    </svg>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AppPreloader',
});
</script>

<style scoped lang="scss">
.preloader {
  width: 18px;
  height: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #f4f6f9;
}

.preloader__image {
  animation: spin 1s infinite linear;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
