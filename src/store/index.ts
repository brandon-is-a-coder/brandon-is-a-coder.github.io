import Vuex, { CommitOptions, DispatchOptions, Store as VuexStore } from 'vuex'
import Vue from 'vue'
import { State } from './state'
import { Getters } from './getters'
import { Mutations } from './mutations'
import { Actions } from './actions'
import Resume from '@/components/resume/store/'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    resume: Resume
  }
})

export default store

export type Store = Omit<VuexStore<State>,
  'getters' | 'commit' | 'dispatch'> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]> (
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions> (
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
}
