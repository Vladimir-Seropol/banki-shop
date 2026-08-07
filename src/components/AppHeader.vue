<template>
  <header class="header">
    <div class="container">
      <div class="header__body">
        <!-- <a href="/" class="header__logo">
          <img src="/logo.png" alt="Banki.shop" width="120" height="40" />
        </a> -->

        <nav class="header__menu">
          <button
            class="header__burger"
            :class="{ active: isMenuOpen }"
            type="button"
            aria-label="Меню"
            @click="isMenuOpen = !isMenuOpen"
          >
            <span class="header__burger-line" />
          </button>

          <ul class="header__menu-body" :class="{ 'header__menu-body--open': isMenuOpen }">
            <li v-for="item in menuItems" :key="item" class="header__menu-item">
              <a href="#">{{ item }}</a>
            </li>
          </ul>
        </nav>

                <div class="header__cart">
          <CartIcon :count="cartCount" />
        </div>

        <div class="header__search">
          <input
            :value="searchQuery"
            class="header__search-input"
            type="search"
            placeholder="Поиск по названию картины"
            aria-label="Поиск по названию"
            @input="onSearchInput"
          />
          <button class="header__search-btn btn" type="button" aria-label="Искать">
            <span class="visually-hidden">Найти</span>
          </button>
        </div>


      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import CartIcon from './CartIcon.vue';

export default Vue.extend({
  name: 'AppHeader',
  components: { CartIcon },
  props: {
    searchQuery: {
      type: String,
      default: '',
    },
    cartCount: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isMenuOpen: false,
      menuItems: ['Каталог', 'Доставка', 'Оплата', 'Контакты', 'О компании'],
    };
  },
  methods: {
    onSearchInput(event: Event): void {
      const target = event.target as HTMLInputElement;
      this.$emit('search', target.value);
    },
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.header {
  background-color: $bgc;
  width: 100%;
  min-height: 96px;
  border-bottom: 1px solid $secondary-disable;

  &__body {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    gap: 26px;
    min-height: 85px;
  }

  &__logo {
    display: flex;
    align-items: center;
    flex-shrink: 0;

    img {
      height: 40px;
      width: auto;
    }
  }

  &__menu {
    width: 50%;
    display: flex;
    position: relative;
    padding: 2px 8px;
    margin-left: 65px;
  }

  &__menu-body {
    display: flex;
    width: 100%;
    justify-content: space-around;
    transition-duration: 0.2s;
  }

  &__menu-item {
    margin: 37px 0;
  }

  &__search {
    display: flex;
    align-items: center;
    width: 416px;
    flex-shrink: 0;
    position: relative;
    right: 0;
  }

  &__search-input {
    background: none;
    max-width: 350px;
    width: 100%;
    border: 1px solid $secondary-disable;
    padding: 13px;
    font-size: 14px;

    &::placeholder {
      font-weight: 400;
      font-size: 14px;
      line-height: 150%;
      letter-spacing: 0%;
      vertical-align: middle;
      color: rgba(159, 159, 159, 1);
    }

    &::-webkit-input-placeholder {
      font-weight: 400;
      font-size: 14px;
      line-height: 150%;
      letter-spacing: 0%;
      vertical-align: middle;
      color: rgba(159, 159, 159, 1);
    }

    &::-moz-placeholder {
      font-weight: 400;
      font-size: 14px;
      line-height: 150%;
      letter-spacing: 0%;
      vertical-align: middle;
      color: rgba(159, 159, 159, 1);
      opacity: 1;
    }

    &:-ms-input-placeholder {
      font-weight: 400;
      font-size: 14px;
      line-height: 150%;
      letter-spacing: 0%;
      vertical-align: middle;
      color: rgba(159, 159, 159, 1);
    }
  }

  &__search-btn {
    padding: 13px 36px;
    min-width: auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &__cart {
    flex-shrink: 0;
  }

  &__burger {
    margin: 5px;
    align-self: center;
    cursor: pointer;
    width: 30px;
    height: 30px;
    display: none;
    background: none;
    position: relative;
  }

  &__burger-line {
    display: block;
    margin-top: calc(50% - 2px);
    height: 4px;
    width: 30px;
    background-color: $primary;
    position: relative;

    &::before,
    &::after {
      content: '';
      height: 4px;
      width: 30px;
      position: absolute;
      background-color: $primary;
      left: 0;
    }

    &::before {
      top: 10px;
    }

    &::after {
      bottom: 10px;
    }
  }
}

@media screen and (max-width: 979px) {
  .header__burger {
    display: flex;
    margin: 27px 10px;
  }

  .header__menu {
     margin-left: 0;
  }

  .header__menu-body {
    display: none;

    &--open {
      animation: fade-in-out 0.2s backwards ease-in-out;
      display: flex;
      flex-direction: column;
      position: absolute;
      z-index: 3;
      background-color: $bgc;
      border-bottom: 1px solid $secondary-disable;
      top: 85px;
      left: 0;
      width: 100vw;
      margin-left: -15px;
      padding: 0 15px;

      .header__menu-item {
        margin: 15px;
      }
    }
  }
  
  .header__search {
    width: auto;
    padding-left: 0;
  }
}

@media screen and (max-width: 768px) {
  .header__menu {
    width: auto;
  }
}

@media screen and (max-width: 673px) {
  .header__search-input {
    max-width: 180px;
  }
}

@media screen and (max-width: 440px) {
  .header__body {
    flex-wrap: wrap;
    padding: 12px 0;
    min-height: auto;
  }

  .header__search {
    order: 3;
    width: 100%;
  }

  .header__search-input {
    max-width: none;
    flex: 1;
  }
}
</style>