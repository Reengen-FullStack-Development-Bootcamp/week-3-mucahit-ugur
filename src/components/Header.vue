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
        :value="authType"
        class="mt-8 user-select"
        :items="['Admin', 'User']"
        v-on:change="setAuthType"
        label="Admin"
        solo
      ></v-select>
    </div>
    <div class="error-msg">
      <v-snackbar absolute :timeout="timeout" v-model="snackbar">
        {{ text }}

        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-app-bar>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Header',
  data() {
    return {
      mod: 'Admin',
      snackbar: false,
      text: 'Unauthorized Access is forbidden',
      timeout: 2000,
    }
  },
  computed: {
    ...mapState(['authType']),
  },
  methods: {
    ...mapActions(['setAuthType']),
    goToLogs() {
      if (this.authType !== 'Admin') {
        this.snackbar = true
        return
      }

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
  // redirects home page if auth type is not Admin
  updated() {
    if (this.authType !== 'Admin') {
      this.$router.replace({ name: 'Home' }).catch((error) => {
        if (error.name != 'NavigationDuplicated') {
          throw error
        }
      })
    }
  },
}
</script>

<style>
.error-msg {
  position: absolute;
  top: 90vh;
  left: 50vw;
}
</style>
