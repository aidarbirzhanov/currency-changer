<script setup lang="ts">
import { ref } from 'vue'
import { useClickOutside } from '@/composables/useClickOutside.ts'
import { useCurrencyStore } from '@/stores/currency.ts'

const currencyStore = useCurrencyStore()

const dropdownRef = ref()
const isDropdownOpen = ref(false)

const currencies = ['USD', 'EUR', 'RUB']

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const selectCurrency = (currency: string) => {
  currencyStore.setBaseCurrency(currency)
  isDropdownOpen.value = false
}

useClickOutside(dropdownRef, () => {
  isDropdownOpen.value = false
})
</script>

<template>
  <div
    class="currency-selector"
    @click="toggleDropdown">
    <div class="selected">
      {{ currencyStore.baseCurrency }}
      <span
        class="arrow"
        :class="{ open: isDropdownOpen }"/>
    </div>
    <div
      v-if="isDropdownOpen"
      ref="dropdownRef"
      class="dropdown">
      <div
        v-for="currency in currencies"
        :key="currency"
        @click.stop="selectCurrency(currency)"
        class="dropdown-item">
        {{ currency }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.currency-selector {
  position: relative;
  cursor: pointer;
  user-select: none;

  .selected {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    color:black;
    border: 1px solid #ccc;
    border-radius: 6px;
    background-color: #f9f9f9;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f0f0f0;
    }

    .arrow {
      margin-left: 8px;
      border: solid #666;
      border-width: 0 2px 2px 0;
      display: inline-block;
      padding: 4px;
      transform: rotate(45deg);
      transition: transform 0.3s;
    }

    .arrow.open {
      transform: rotate(-135deg);
    }
  }

  .dropdown {
    position: absolute;
    top: 110%;
    right: 0;
    background: #fff;
    border: 1px solid #ddd;
    color:black;
    border-radius: 6px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 100;

    .dropdown-item {
      padding: 10px 16px;
      cursor: pointer;
      white-space: nowrap;

      &:hover {
        background-color: #f2f2f2;
      }
    }
  }
}
</style>
