<template>
  <v-container class="job-history-view d-flex">
    <v-container class="job-listings d-flex flex-column">
      <div v-for="job in GET_JOBS" :key="job.org" class="job-listings-item py-2">
        <span class="font-weight-bold">{{ job.org }}</span>
        <div class="">
          {{ job.start }} - {{ job.end }}
        </div>
        <ul>
          <li v-for="role in job.roles" :key="role" class="">{{ role }}</li>
        </ul>

      </div>
    </v-container>

    <v-container class="job-details d-flex flex-wrap flex-grow-1">
      <div class="job-tags ma-2 d-flex flex-wrap">
        <div v-for="tag in GET_TAGS" :key="tag" class="job-details-tag ma-1 px-2 py-1 rounded-xl" @click="TOGGLE_ITEMS_EXPAND_BY_TAG(tag)">
          {{ tag }}
        </div>
      </div>

      <div class="job-actions my-2">
        <v-icon class="float-right" v-if="showHidden" color="green" @click="toggleShowHidden">mdi-close</v-icon>
        <v-icon class="float-right" v-if="!showHidden" @click="toggleShowHidden">mdi-close</v-icon>

        <v-icon class="float-right" @click="TOGGLE_ITEMS_COLLAPSE_ALL()">mdi-minus</v-icon>
        <v-icon class="float-right" @click="TOGGLE_ITEMS_EXPAND_ALL()">mdi-plus</v-icon>
      </div>

      <job-history-item v-for="(item, index) in jobhistory" :key="index" :data="item" :index="index" :show-hidden="showHidden"></job-history-item>

    </v-container>
  </v-container>
</template>

<script>
import JobHistoryItem from '@/components/resume/components/JobHistoryItem'
import { MutationTypes } from '@/components/resume/store/mutation-types'
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'JobHistoryView',
  components: { JobHistoryItem },
  data () {
    return {
      showHidden: false
    }
  },
  computed: {
    ...mapState('resume', [
      'jobhistory'
    ]),
    ...mapGetters('resume', [
      'GET_JOBS',
      'GET_TAGS'
    ])
  },
  methods: {
    ...mapMutations('resume', [
      MutationTypes.TOGGLE_ITEMS_EXPAND_BY_TAG,
      MutationTypes.TOGGLE_ITEMS_COLLAPSE_ALL,
      MutationTypes.TOGGLE_ITEMS_EXPAND_ALL
    ]),
    toggleShowHidden () {
      this.showHidden = !this.showHidden
    }
  }
}
</script>

<style scoped>
.job-listings {
  width: 300px;
}

.job-actions {
  width: 100%;
}

.job-listings-item {
  min-width: 200px;
  max-width: 200px;
}

.job-details-tag {
  border: 1px solid var(--v-accent-base);
  max-height: 2.1em;
}
</style>
