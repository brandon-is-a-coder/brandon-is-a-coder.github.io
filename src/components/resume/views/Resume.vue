<template>
  <v-container class="d-flex flex-column">
    <v-card id="job-history-view-card">
      <v-card-text>
        <job-history-view></job-history-view>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import JobHistoryView from '@/components/resume/components/JobHistoryView.vue'

export default {
  name: 'Resume',
  components: {
    JobHistoryView
  },
  methods: {}
}
</script>

<style scoped>

</style>
