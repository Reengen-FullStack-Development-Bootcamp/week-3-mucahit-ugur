import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stockData: null,
    authType: 'Admin',
  },
  mutations: {
    GET_DAILY_DATA(state, payload) {
      state.stockData = payload
    },
    GET_WEEKLY_DATA(state, payload) {
      state.stockData = payload
    },
    GET_MONTHLY_DATA(state, payload) {
      state.stockData = payload
    },
  },
  actions: {
    async getDailyData({ commit }) {
      const response = await axios.get(
        'https://alpha-vantage.p.rapidapi.com/query',
        {
          method: 'GET',
          params: {
            function: 'TIME_SERIES_DAILY',
            symbol: 'MSFT',
            outputsize: 'compact',
            datatype: 'json',
          },
          headers: {
            'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
            'x-rapidapi-key':
              '26620c0fcemsh1e101cd2a7d407cp1ecb1bjsn7c0df64d1e50',
          },
        }
      )
      const results = response.data['Time Series (Daily)']
      const keys = Object.keys(results)
      const firstFifty = keys.slice(0, 50)
      const arrWithDate = firstFifty.map((item) => {
        return { title: item, ...results[item] }
      })

      commit('GET_DAILY_DATA', arrWithDate)
    },

    getWeeklyData({ commit }) {
      axios
        .get('https://alpha-vantage.p.rapidapi.com/query', {
          method: 'GET',
          params: {
            function: 'TIME_SERIES_WEEKLY',
            symbol: 'MSFT',
            outputsize: 'compact',
            datatype: 'json',
          },
          headers: {
            'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
            'x-rapidapi-key':
              '26620c0fcemsh1e101cd2a7d407cp1ecb1bjsn7c0df64d1e50',
          },
        })
        .then((response) => {
          const results = response.data['Weekly Time Series']
          const keys = Object.keys(results)
          const firstFifty = keys.slice(0, 50)
          const arrWithDate = firstFifty.map((item) => {
            return { title: item, ...results[item] }
          })

          commit('GET_WEEKLY_DATA', arrWithDate)
        })
        .catch((error) => console.log(error.message))
    },

    async getMonthlyData({ commit }) {
      const response = await axios.get(
        'https://alpha-vantage.p.rapidapi.com/query',
        {
          method: 'GET',
          params: {
            function: 'TIME_SERIES_MONTHLY',
            symbol: 'MSFT',
            outputsize: 'compact',
            datatype: 'json',
          },
          headers: {
            'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
            'x-rapidapi-key':
              '26620c0fcemsh1e101cd2a7d407cp1ecb1bjsn7c0df64d1e50',
          },
        }
      )

      const results = response.data['Monthly Time Series']
      const keys = Object.keys(results)
      const firstFifty = keys.slice(0, 50)
      const arrWithDate = firstFifty.map((item) => {
        return { title: item, ...results[item] }
      })

      commit('GET_MONTHLY_DATA', arrWithDate)
    },
  },
  modules: {},
})
