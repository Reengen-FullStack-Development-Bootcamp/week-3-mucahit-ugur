<template>
  <div>
    <h3 class="text-center mt-5">{{ this.$route.query.company }}</h3>
    <!-- Data Period BTNS -->
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
    <!-- Chart Container -->
    <div v-if="stockData.length > 0" ref="candleStick"></div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import * as d3 from 'd3'

export default {
  name: 'ChartPage',
  computed: {
    ...mapState(['stockData']),
  },

  methods: {
    ...mapActions(['getDailyData', 'getWeeklyData', 'getMonthlyData']),
    // change data period
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
        // default view is daily
        default:
          this.getDailyData(symbol)
      }
    },
    // retrieve candlestick graph
    retrieveGraph(data) {
      const width = 960
      const height = 500
      const margin = 60

      const y = d3.scaleLinear().range([height - margin, margin])

      const x = d3.scaleTime().range([margin, width - margin])

      // reorganize array items
      data.forEach(function (d) {
        d.title = new Date(d.title)
        d['2. high'] = +d['2. high']
        d['3. low'] = +d['3. low']
        d['1. open'] = +d['1. open']
        d['4. close'] = +d['4. close']
        d['5. volume'] = +d['5. volume']
      })

      const chart = d3
        .select(this.$refs.candleStick)
        .append('div')
        .classed('svg-container', true)
        .append('svg')
        .attr('width', '80%')
        .attr('height', '100%')
        // responsive view setting
        .attr('preserveAspectRatio', 'xMinYMin')
        .attr('viewBox', '0 0 960 500')
        .classed('svg-content-responsive', true)

      y.domain([
        d3.min(
          data.map(function (x) {
            return x['3. low'] - 5
          })
        ),
        d3.max(
          data.map(function (x) {
            return x['2. high'] + 5
          })
        ),
      ])

      x.domain(
        d3.extent(data, function (d) {
          return d['title']
        })
      )
      // vertical ruler
      chart
        .selectAll('line.x')
        .data(x.ticks(10))
        .enter()
        .append('line')
        .attr('class', 'x')
        .attr('x1', x)
        .attr('x2', x)
        .attr('y1', margin)
        .attr('y2', height - margin)
        .attr('stroke', '#ccc')

      // horizontal ruler
      chart
        .selectAll('line.y')
        .data(y.ticks(10))
        .enter()
        .append('line')
        .attr('class', 'y')
        .attr('x1', margin)
        .attr('x2', width - margin)
        .attr('y1', y)
        .attr('y2', y)
        .attr('stroke', '#ccc')

      // date info
      chart
        .append('g')
        .attr('transform', 'translate(0,' + Math.floor(height - margin) + ')')
        .attr('class', 'xrule')
        .call(d3.axisBottom(x))
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-.8em')
        .attr('dy', '.15em')
        .attr('transform', function () {
          return 'rotate(-65)'
        })
      // stock price info
      chart
        .append('g')
        .attr('transform', 'translate(' + margin + ', 0)')
        .call(d3.axisLeft(y))

      // candle rectangle
      chart
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', function (d) {
          return x(d['title'])
        })
        .attr('y', function (d) {
          return y(Math.max(d['1. open'], d['4. close']))
        })
        .attr('height', function (d) {
          return (
            y(Math.min(d['1. open'], d['4. close'])) -
            y(Math.max(d['1. open'], d['4. close']))
          )
        })
        .attr('width', function () {
          return (0.5 * (width - 2 * margin)) / data.length
        })
        .attr('fill', function (d) {
          return d['1. open'] > d['4. close'] ? 'red' : 'green'
        })
        // shows info on candle hover
        .append('title')
        .text(
          (d) =>
            'Date: ' +
            d['title'].toUTCString().slice(0, 16) +
            '\nOpen: ' +
            d['1. open'] +
            '\nHigh: ' +
            d['2. high'] +
            '\nLow: ' +
            d['3. low'] +
            '\nClose: ' +
            d['4. close'] +
            '\nVolume: ' +
            d['5. volume']
        )
      // candle rectangle line
      chart
        .selectAll('line.stem')
        .data(data)
        .enter()
        .append('line')
        .attr('class', 'stem')
        .attr('x1', function (d) {
          return x(d['title']) + (0.25 * (width - 2 * margin)) / data.length
        })
        .attr('x2', function (d) {
          return x(d['title']) + (0.25 * (width - 2 * margin)) / data.length
        })
        .attr('y1', function (d) {
          return y(d['2. high'])
        })
        .attr('y2', function (d) {
          return y(d['3. low'])
        })
        .attr('stroke', function (d) {
          return d['1. open'] > d['4. close'] ? 'red' : 'green'
        })
    },
  },
  created() {
    const { period, symbol } = this.$route.params
    switch (period) {
      case 'daily':
        this.getDailyData(symbol)
        break
      case 'weekly':
        this.getWeeklyData(symbol)
        break
      case 'monthly':
        this.getMonthlyData(symbol)
        break
      default:
        this.getDailyData(symbol)
    }
    // retrieve graph using global state
    this.retrieveGraph(this.stockData)
  },
  // when data comes, retrieve graph
  updated() {
    this.retrieveGraph(this.stockData)
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

.svg-container {
  display: flex;
  justify-content: center;
}
</style>
