<template>
  <v-app-bar app color="amber darken-1" dark>
    <div class="d-flex align-center logo" @click="goHome">
      <v-img
        alt="StockMarket Logo"
        class="shrink mr-2"
        contain
        :src="require('@/assets/logo.png')"
        transition="scale-transition"
        width="40"
      />

      <v-btn class="shrink mt-1 hidden-sm-and-down" text>
        <span class="mr-2">Stock Market</span>
      </v-btn>
    </div>
    <v-spacer></v-spacer>

    <v-btn large class="mr-5" @click="goToLogs">Logs</v-btn>
    <div>
      <v-select
        light
        class="mt-8 user-select"
        :items="['Admin', 'User']"
        label="Admin"
        solo
      ></v-select>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isAdmin: true,
    }
  },
  methods: {
    goToLogs() {
      this.$router.push({ path: 'logs' }).catch((error) => {
        if (error.name != 'NavigationDuplicated') {
          throw error
        }
      })
    },
    goHome() {
      this.$router.push({ name: 'Home' }).catch((error) => {
        if (error.name != 'NavigationDuplicated') {
          throw error
        }
      })
    },
  },
}
</script>

<style></style>
