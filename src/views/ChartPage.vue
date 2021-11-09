<template>
  <div>
    <h3 class="text-center mt-5">{{ this.$route.query.company }}</h3>
    <div class="btn-container">
      <v-btn
        :color="$route.params.period === 'daily' ? 'secondary' : 'light'"
        @click="setPeriod('daily')"
        class="period"
        >Daily</v-btn
      >
      <v-btn
        :color="$route.params.period === 'weekly' ? 'secondary' : 'light'"
        @click="setPeriod('weekly')"
        class="period"
        >Weekly</v-btn
      >
      <v-btn
        @click="setPeriod('monthly')"
        :color="$route.params.period === 'monthly' ? 'secondary' : 'light'"
        class="period"
        >Monthly</v-btn
      >
    </div>
    <div v-if="stockData.length > 0" ref="candleStick"></div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
// import * as d3 from 'd3'

export default {
  name: 'ChartPage',
  computed: {
    ...mapState(['stockData']),
  },

  methods: {
    ...mapActions(['getDailyData', 'getWeeklyData', 'getMonthlyData']),
    setPeriod(period) {
      const symbol = this.$route.params.symbol
      const { company } = this.$route.query
      switch (period) {
        case 'daily':
          this.getDailyData(symbol)
          this.$router.push({ path: 'daily', query: { company } })
          break
        case 'weekly':
          this.getWeeklyData(symbol)
          this.$router.push({ path: 'weekly', query: { company } })

          break
        case 'monthly':
          this.getMonthlyData(symbol)
          this.$router.push({ path: 'monthly', query: { company } })

          break
        default:
          this.getDailyData(symbol)
      }
    },
  },
}
</script>

<style>
.btn-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.period {
  margin: 0 10px;
}
</style>
