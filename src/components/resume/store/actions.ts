import { ActionContext, ActionTree } from 'vuex'
import { State } from './state'
import { Mutations } from './mutations'
import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { getJobHistory, JobHistory } from '../ts/resume/resume'

type AugmentedActionContext = {
  commit<K extends keyof Mutations> (
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
  [ActionTypes.RESET_JOB_HISTORY] (
    { commit }: AugmentedActionContext
  ): void,

  [ActionTypes.TOGGLE_ITEM_VISIBILITY_FAVORITE] (
    { commit }: AugmentedActionContext,
    index: number
  ): void,

  [ActionTypes.TOGGLE_ITEM_VISIBILITY_EXPANDED] (
    { commit }: AugmentedActionContext,
    index: number
  ): void,

  [ActionTypes.TOGGLE_ITEM_VISIBILITY_CONDENSED] (
    { commit }: AugmentedActionContext,
    index: number
  ): void
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.RESET_JOB_HISTORY] ({ commit }) {
    const jobHistory: JobHistory[] = getJobHistory()
    commit(MutationTypes.SET_JOB_HISTORY, jobHistory)
  },
  [ActionTypes.TOGGLE_ITEM_VISIBILITY_FAVORITE] ({ commit }, index) {
    commit(MutationTypes.TOGGLE_ITEM_VISIBILITY_FAVORITE, index)
  },
  [ActionTypes.TOGGLE_ITEM_VISIBILITY_EXPANDED] ({ commit }, index) {
    commit(MutationTypes.TOGGLE_ITEM_VISIBILITY_EXPANDED, index)
  },
  [ActionTypes.TOGGLE_ITEM_VISIBILITY_CONDENSED] ({ commit }, index) {
    commit(MutationTypes.TOGGLE_ITEM_VISIBILITY_CONDENSED, index)
  }
}
