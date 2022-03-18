import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { State } from './state'
import { JobHistory } from '../ts/resume/resume'
import { VisibilityOptions } from '@/components/resume/ts/Utility/mixins/Visibility'
import { compareDates } from '@/components/resume/ts/Utility/mixins/Timeline'

export type Mutations<S = State> = {
  [MutationTypes.SET_JOB_HISTORY] (state: S, history: JobHistory[]): void,
  [MutationTypes.TOGGLE_ITEM_VISIBILITY_EXPANDED] (state: S, index: number): void,
  [MutationTypes.TOGGLE_ITEM_VISIBILITY_FAVORITE] (state: S, index: number): void,
  [MutationTypes.TOGGLE_ITEM_VISIBILITY_CONDENSED] (state: S, index: number): void,
  [MutationTypes.TOGGLE_ITEMS_COLLAPSE_ALL] (state: S): void,
  [MutationTypes.TOGGLE_ITEMS_EXPAND_ALL] (state: S): void,
  [MutationTypes.TOGGLE_ITEMS_EXPAND_BY_TAG] (state: S, tag: string): void,
  [MutationTypes.TOGGLE_ITEM_VISIBILITY_HIDDEN](state: S, index: number): void,
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_JOB_HISTORY] (state, history: JobHistory[]) {
    state.jobhistory = history.slice().sort((a, b) => compareDates(a.details, b.details)).reverse()
  },
  TOGGLE_ITEM_VISIBILITY_EXPANDED (state: State, index: number): void {
    state.jobhistory.splice(index, 1, toggleItemVisibilityOption({ ...state.jobhistory[index] }, VisibilityOptions.EXPANDED))
  },
  TOGGLE_ITEM_VISIBILITY_FAVORITE (state: State, index: number): void {
    state.jobhistory.splice(index, 1, toggleItemVisibilityOption({ ...state.jobhistory[index] }, VisibilityOptions.FAVORITE))
  },
  TOGGLE_ITEM_VISIBILITY_CONDENSED (state: State, index: number): void {
    state.jobhistory.splice(index, 1, toggleItemVisibilityOption({ ...state.jobhistory[index] }, VisibilityOptions.CONDENSED))
  },
  TOGGLE_ITEM_VISIBILITY_HIDDEN (state: State, index: number): void {
    state.jobhistory.splice(index, 1, toggleItemVisibilityOption({ ...state.jobhistory[index] }, VisibilityOptions.HIDDEN))
  },
  TOGGLE_ITEMS_COLLAPSE_ALL (state: State): void {
    toggleItemsCollapseAll(state.jobhistory)
  },
  TOGGLE_ITEMS_EXPAND_BY_TAG (state: State, tag: string): void {
    toggleItemsExpandAllWithTag(state.jobhistory, tag)
  },
  TOGGLE_ITEMS_EXPAND_ALL (state: State): void {
    toggleItemsExpandAll(state.jobhistory)
  }
}

function toggleItemVisibilityOption (jobHistoryItem: JobHistory, option: VisibilityOptions): JobHistory {
  if (jobHistoryItem.visibility.includes(option)) {
    jobHistoryItem.visibility.splice(
      jobHistoryItem.visibility.indexOf(option), 1
    )
  } else {
    jobHistoryItem.visibility.push(option)
  }
  return jobHistoryItem
}

function toggleItemsCollapseAll (jobHistory: JobHistory[]) {
  jobHistory.forEach((value) => {
    if (value.visibility.includes(VisibilityOptions.EXPANDED)) {
      value.visibility.splice(
        value.visibility.indexOf(VisibilityOptions.EXPANDED), 1
      )
    }
  })
}

function toggleItemsExpandAll (jobHistory: JobHistory[]) {
  jobHistory.forEach((value) => {
    if (!value.visibility.includes(VisibilityOptions.EXPANDED)) {
      value.visibility.push(VisibilityOptions.EXPANDED)
    }
  })
}

function toggleItemsExpandAllWithTag (jobHistory: JobHistory[], tag: string) {
  jobHistory.forEach((value) => {
    if (value.details.tags.includes(tag)) {
      if (!value.visibility.includes(VisibilityOptions.EXPANDED)) {
        value.visibility.push(VisibilityOptions.EXPANDED)
      }
      // Unhide items
      if (value.visibility.includes(VisibilityOptions.HIDDEN)) {
        value.visibility.splice(
          value.visibility.indexOf(VisibilityOptions.HIDDEN), 1
        )
      }

      // Doesn't include tag, hide it
    } else if (!value.visibility.includes(VisibilityOptions.FAVORITE) && !value.visibility.includes(VisibilityOptions.HIDDEN)) {
      value.visibility.push(VisibilityOptions.HIDDEN)
    }
  })
}
