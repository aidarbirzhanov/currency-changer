<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { useCurrencyStore } from '@/stores/currency'

const currencyStore = useCurrencyStore()

const amountFrom = ref(1)
const amountTo = ref(0)

const currencyFrom = ref('RUB')
const currencyTo = ref('USD')

const allCurrencies = computed(() => {
  const set = new Set<string>()
  for (const key of Object.keys(currencyStore.rates)) {
    const [from, to] = key.toUpperCase().split('-')
    set.add(from)
    set.add(to)
  }
  return Array.from(set).sort()
})

const  getRate = (from: string, to: string): number | null => {
  const direct = `${from.toLowerCase()}-${to.toLowerCase()}`
  const inverse = `${to.toLowerCase()}-${from.toLowerCase()}`
  if (currencyStore.rates[direct]) {
    return currencyStore.rates[direct]
  } else if (currencyStore.rates[inverse]) {
    return 1 / currencyStore.rates[inverse]
  }
  return null
}

const convert = (fromAmount: number, fromCurrency: string, toCurrency: string): number => {
  const rate = getRate(fromCurrency, toCurrency)
  return rate ? parseFloat((fromAmount * rate).toFixed(2)) : 0
}

watch([amountFrom, currencyFrom, currencyTo], () => {
  amountTo.value = convert(amountFrom.value, currencyFrom.value, currencyTo.value)
})

watch([amountTo, currencyFrom, currencyTo], ([toVal], [oldToVal]) => {
  if (document.activeElement === document.querySelector('.input-to')) {
    amountFrom.value = convert(toVal, currencyTo.value, currencyFrom.value)
  }
})

watch(
  () => [currencyFrom.value, currencyTo.value],
  ([newFrom, newTo], [oldFrom, oldTo]) => {
    if (newFrom === newTo) {
      if (newFrom !== oldFrom) {
        currencyTo.value = oldFrom
      } else if (newTo !== oldTo) {
        currencyFrom.value = oldTo
      }
    }
  }
)

onMounted(() => {
  if (!Object.keys(currencyStore.rates).length) {
    currencyStore.fetchRates().then(() => {
      amountTo.value = convert(amountFrom.value, currencyFrom.value, currencyTo.value)
    })
  } else {
    amountTo.value = convert(amountFrom.value, currencyFrom.value, currencyTo.value)
  }
})
</script>

<template>
  <main class="converter-container">
    <h2 class="title">
      Конвертер валют
    </h2>

    <div class="converter-row">
      <select
        v-model="currencyFrom"
        class="dropdown">
        <option
          v-for="cur in allCurrencies"
          :key="cur"
          :value="cur">
          {{ cur }}
        </option>
      </select>
      <input
        v-model.number="amountFrom"
        type="number"
        min="0"
        class="input"
        placeholder="Введите сумму" />
    </div>

    <div class="converter-row">
      <select
        v-model="currencyTo"
        class="dropdown">
        <option
          v-for="cur in allCurrencies"
          :key="cur"
          :value="cur">
          {{ cur }}
        </option>
      </select>
      <input
        v-model.number="amountTo"
        type="number"
        min="0"
        class="input input-to"
        placeholder="Результат" />
    </div>
  </main>
</template>

<style scoped lang="scss">
.converter-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
  color: #333;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 32px;

  border-bottom: 2px solid #eee;
  padding-bottom: 8px;
}

.converter-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.dropdown {
  flex: 1;
  padding: 10px 14px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #fff;
}

.input {
  flex: 2;
  padding: 10px 14px;
  font-size: 18px;
  border-radius: 6px;
  border: 1px solid #ccc;
  transition: border-color 0.2s;

  &:focus {
    border-color: #2a72d4;
    outline: none;
    background-color: #fff;
  }
}
</style>
