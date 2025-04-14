import { defineStore } from 'pinia'
import axios from 'axios'

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    baseCurrency: 'RUB',
    rates: {} as Record<string, number>,
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchRates() {
      this.loading = true
      try {
        const response = await axios.get('https://status.neuralgeneration.com/api/currency')
        this.rates = response.data
        this.error = null
      } catch (err) {
        this.error = 'Ошибка загрузки курсов валют'
      } finally {
        this.loading = false
      }
    },

    setBaseCurrency(currency: string) {
      this.baseCurrency = currency
    }
  },

  getters: {
    convertedRates: (state) => {
      const result: { currency: string; rate: number }[] = []
      const base = state.baseCurrency.toLowerCase()

      Object.entries(state.rates).forEach(([key, value]) => {
        const [from, to] = key.split('-')
        if (from === base) {
          result.push({
            currency: to.toUpperCase(),
            rate: value
          })
        }
      })

      return result
    }
  }
})
