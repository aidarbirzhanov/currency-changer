<script setup lang="ts">
import { onMounted } from 'vue'
import { useCurrencyStore } from '@/stores/currency.ts'

const currencyStore = useCurrencyStore()

onMounted(() => {
  currencyStore.fetchRates()
})
</script>

<template>
  <main class="currency-container">
    <h1 class="title">
      Курсы по отношению к
      <span class="base">
        {{ currencyStore.baseCurrency }}
      </span>
    </h1>

    <div
      v-if="currencyStore.loading"
      class="info loading">
      Загрузка курсов...
    </div>
    <div
      v-else-if="currencyStore.error"
      class="info error">
      {{ currencyStore.error }}
    </div>

    <ul v-else class="rates-grid">
      <li
        v-for="item in currencyStore.convertedRates"
        :key="item.currency"
        class="rate-card">
        <div class="label">
          1 {{ currencyStore.baseCurrency }} =
        </div>
        <div
          class="value">
          {{ item.rate }}
          <span class="currency">
            {{ item.currency }}
          </span>
        </div>
      </li>
    </ul>
  </main>
</template>

<style scoped lang="scss">
.currency-container {
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 20px;
  color: #333;
}

.title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  border-bottom: 2px solid #eee;
  padding-bottom: 8px;

  .base {
    color: #2a72d4;
  }
}

.info {
  font-size: 16px;
  margin-top: 20px;
  padding: 12px 16px;
  border-radius: 6px;

  &.loading {
    background-color: #f9f9f9;
    color: #666;
    border: 1px solid #ddd;
  }

  &.error {
    background-color: #ffe5e5;
    color: #c0392b;
    border: 1px solid #e6b0b0;
  }
}

.rates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.rate-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
  }

  .label {
    font-size: 14px;
    color: #666;
    margin-bottom: 6px;
  }

  .value {
    font-size: 20px;
    font-weight: 600;
    color: #222;

    .currency {
      font-size: 14px;
      color: #888;
      margin-left: 4px;
    }
  }
}
</style>
