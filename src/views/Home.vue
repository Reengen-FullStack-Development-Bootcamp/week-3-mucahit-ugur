<template>
  <div>
    <div class="ma-5" align="center">
      <v-form class="search-form" @submit.prevent="searchSymbol">
        <v-text-field
          v-model="search"
          label="Company Name"
          clearable
          class="search-input"
        ></v-text-field>
        <v-btn type="submit">Search</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      search: null,
    }
  },
  methods: {
    searchSymbol() {
      console.log('submitted')
    },
  },
}
</script>

<style>
.search-form {
  max-width: 700px;
  display: flex;
  align-items: center;
  padding: 20px 40px;
}

.search-input {
  margin-right: 10px;
}
</style>
