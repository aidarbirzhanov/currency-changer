<script setup lang="ts">
import AppDropdown from '@/components/CurrencyDropdown.vue'

interface ILink {
  link: string
  title: string
}

const links: ILink[] = [
  { link: '/', title: 'Главная' },
  { link: '/convert', title: 'Конвертация' }
]

</script>

<template>
  <header class="the-header">
    <div class="header__inner container">
      <!-- Навигация -->
      <nav class="nav-links">
        <RouterLink
          v-for="(link, index) in links"
          :key="index"
          :to="link.link"
          class="nav-link"
        >
          {{ link.title }}
        </RouterLink>
      </nav>

      <!-- Dropdown -->
      <AppDropdown/>
    </div>
  </header>
</template>

<style scoped lang="scss">
.the-header {
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 16px 0;

  .header__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-links {
    display: flex;
    gap: 24px;

    .nav-link {
      text-decoration: none;
      color: #333;
      font-weight: 500;
      position: relative;
      transition: color 0.3s;

      &:hover {
        color: #007bff;
      }

      &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0;
        height: 2px;
        background-color: #007bff;
        transition: width 0.3s;
      }

      &:hover::after {
        width: 100%;
      }
    }
  }
}
</style>
