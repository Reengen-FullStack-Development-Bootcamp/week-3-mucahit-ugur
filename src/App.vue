<template>
  <v-app>
    <Header />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header.vue'
export default {
  name: 'App',
  components: {
    Header,
  },
}
</script>

<style>
.logo {
  cursor: pointer;
}

.input_label {
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.25px;
  margin-left: 10px;
}

.user-select {
  width: 150px;
}
</style>
