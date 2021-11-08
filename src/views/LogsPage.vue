<template>
  <div class="ma-5">
    <h3 class="ml-10">Log History</h3>
    <v-row>
      <v-col>
        <!-- logs display in treeview -->
        <v-treeview dense hoverable :items="items">
          <!-- if unauthorized, display title in red color -->
          <template v-slot:label="{ item }">
            <span
              :class="{
                'error-message': item.unauthorized,
              }"
            >
              {{ item.name }}
            </span>
          </template>
        </v-treeview>
      </v-col>
    </v-row>
    <!-- if no logs, don't display btn -->
    <v-row v-if="this.logs.length > 0">
      <!-- remove logs btn -->
      <v-btn color="amber" class="ml-10" @click="removeLogs"
        >Remove all logs</v-btn
      >
    </v-row>

    <!-- if no history available, show info message -->
    <v-row v-if="this.logs.length === 0">
      <v-col class="ml-10">No history available! </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'LogsPage',
  data() {
    return {
      logs: JSON.parse(localStorage.getItem('localLogs')),
    }
  },
  computed: {
    //global state
    ...mapState(['authType']),
    // treeview items
    items() {
      // date display options
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }

      // map logs array to structure vuetify treeview items data
      return this.logs.map((log, i) => {
        return {
          id: log.date + i,
          name: new Date(log.date).toLocaleDateString('en-US', options),
          // treview subitems
          children: [
            { id: log.date + 'child1', name: 'from: ' + log.from },
            { id: log.date + 'child2', name: 'to: ' + log.to },
            {
              id: log.date + 'child3',
              name: 'Auth Error: ' + log.unauthorized,
            },
          ],
          unauthorized: log.unauthorized,
        }
      })
    },
  },
  methods: {
    // remove all logs from local storage
    removeLogs() {
      localStorage.removeItem('localLogs')
      this.logs = []
    },
  },
}
</script>

<style>
.error-message {
  color: red;
}
</style>
