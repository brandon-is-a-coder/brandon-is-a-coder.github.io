<template>
  <v-sheet :id="getId()" v-if="(isHidden && showHidden) || !isHidden " :class="{'job-history-item-expanded': isExpanded}"
           class="job-history-item overflow-y-auto mx-2 my-1"
           rounded>
    <div class="job-history-item-header pa-1 overflow-y-auto">

      <div class="job-history-actions pa-1 float-right">
        <v-icon v-if="isFavorite" class="job-history-action" :class="{'muted': isHidden}" @click="toggleFavorite( index )">mdi-star</v-icon>
        <v-icon v-if="!isFavorite" class="job-history-action" :class="{'muted': isHidden}" @click="toggleFavorite( index )">mdi-star-outline</v-icon>
        <v-icon class="job-history-action" :class="{'muted': isHidden}" @click="toggleHidden( index )">mdi-close</v-icon>
      </div>

      <span class="job-history-item-org pa-1 font-weight-bold float-right text-uppercase">
        {{ data.details.org }}
      </span>

      <div class="job-history-item-role pa-1 font-weight-bold text-uppercase">
        <v-icon v-if="isExpanded" class="job-history-action" :class="{'muted': isHidden}" @click="toggleExpanded( index )">mdi-minus</v-icon>
        <v-icon v-if="!isExpanded" class="job-history-action" :class="{'muted': isHidden}" @click="toggleExpanded( index )">mdi-plus</v-icon>
        {{ data.details.role }}
      </div>

      <span class="job-history-item-date-range font-weight-bold float-right">
        <span class="job-history-item-start">{{ data.details.start }}</span> -
        <span class="job-history-item-start">{{ data.details.end ? data.details.end : 'now' }}</span>
      </span>

      <div class="job-history-item-description pa-2">
        {{ data.details.description }}
      </div>
    </div>

    <div :hidden="!isExpanded" class="job-not-condensed">

      <span class="job-history-item-description-header ma-1">Description: <br/></span>
      <div class="job-history-item-description px-4 my-2 font-weight-medium">
        {{ data.details.description }}
      </div>

      <span class="job-history-item-highlights-header mx-1">Highlights: <br/></span>
      <div class="job-history-item-highlights px-2">
        <div v-for="(highlight, i) in data.details.highlights" :key="i" class="job-history-item-highlight ma-2">
          {{ highlight }}
        </div>
      </div>

    </div>
  </v-sheet>
</template>

<script type="ts">
import Vue from 'vue'
import { JobHistory } from '../ts/resume/resume'
import { VisibilityOptions } from '@/components/resume/ts/Utility/mixins/Visibility'
import { mapActions, mapMutations } from 'vuex'
import { ActionTypes } from '@/components/resume/store/action-types'
import { MutationTypes } from '@/components/resume/store/mutation-types'

export default Vue.extend({
  name: 'JobHistoryItem',
  computed: {
    isHidden () {
      return this.data && this.data.visibility && this.data.visibility.includes(VisibilityOptions.HIDDEN)
    },
    isExpanded () {
      return this.data && this.data.visibility && this.data.visibility.includes(VisibilityOptions.EXPANDED)
    },
    isCondensed () {
      return this.data && this.data.visibility && this.data.visibility.includes(VisibilityOptions.CONDENSED)
    },
    isFavorite () {
      return this.data && this.data.visibility && this.data.visibility.includes(VisibilityOptions.FAVORITE)
    }
  },
  components: {},
  props: {
    index: Number,
    data: {
      type: JobHistory
    },
    showHidden: Boolean
  },
  methods: {
    ...mapActions('resume', {
      toggleExpanded: ActionTypes.TOGGLE_ITEM_VISIBILITY_EXPANDED,
      toggleFavorite: ActionTypes.TOGGLE_ITEM_VISIBILITY_FAVORITE
    }),
    ...mapMutations('resume', {
      toggleHidden: MutationTypes.TOGGLE_ITEM_VISIBILITY_HIDDEN
    }),
    getId: function () {
      return this.data.details.org + '-' + this.data.details.role.replaceAll(' ', '-')
    }
  }
})
</script>

<style scoped>
.job-history-item {
  min-width: 100%;
  max-width: 100%;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}

.job-history-item::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}

.job-history-item-header {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}

.job-history-item-header::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}

.job-history-item-description {
}

.job-history-item-expanded {
}
.job-history-item-role {
  background-color: var(--v-primary-base);
}
.job-history-action.v-icon {
  -webkit-text-stroke: 0 var(--v-info-base);
  -webkit-text-fill-color: var(--v-info-base);
}

.job-history-action.v-icon.muted {
  -webkit-text-stroke: 0 var(--v-error-lighten2);
  -webkit-text-fill-color: var(--v-error-lighten2);
}
</style>
