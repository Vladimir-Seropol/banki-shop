<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__body">
        <nav class="footer__menu">
          <ul class="footer__menu-body">
            <li v-for="item in menuItems" :key="item" class="footer__menu-item">
              <a href="#">{{ item }}</a>
            </li>
          </ul>
        </nav>

        <div class="footer__tel">
          <img src="/tel.png" alt="" width="16" height="16" />
          <a href="tel:+78125555555">+7 (812) 555-55-55</a>
        </div>

        <div class="footer__address">
          <img src="/address.png" alt="" width="16" height="16" />
          <span>г. Санкт-Петербург, ул. Ефимова, 3</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AppFooter',
  data() {
    return {
      menuItems: ['Каталог', 'Доставка', 'Оплата', 'Контакты', 'О компании'],
    };
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.footer {
  background-color: $secondary-foot;
  width: 100%;

  &__body {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }

  &__menu {
    width: 50%;
  }

  &__menu-body {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  &__menu-item {
    margin: 37px 0;
  }

  &__tel,
  &__address {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}

@media screen and (max-width: 1020px) {
  .footer__body {
    flex-direction: column;
    text-align: center;
  }

  .footer__menu {
    width: 100%;
  }

  .footer__menu-item {
    margin: 30px 0 10px;
  }

  .footer__tel {
    margin: 10px 0;
  }

  .footer__address {
    margin: 10px 0 30px;
  }
}

@media screen and (max-width: 530px) {
  .footer__menu-body {
    flex-direction: column;
    align-items: center;
  }

  .footer__menu-item {
    margin: 10px auto;

    &:first-child {
      margin-top: 30px;
    }
  }
}
</style>
