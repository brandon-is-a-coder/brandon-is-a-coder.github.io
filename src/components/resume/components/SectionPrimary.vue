<template>
  <v-container id="section-primary" class="d-flex">
    <v-card id="job-history-view-card">
      <v-card-text>
        <job-history-view></job-history-view>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import JobHistoryView from '@/components/resume/components/JobHistoryView'

export default {
  name: 'SectionPrimary',
  components: { JobHistoryView },
  computed: {},
  methods: {}
}
</script>

<style scoped>
#job-history-view-card {
  background-color: var(--v-primary-base);
  width: 100%;
}
</style>
