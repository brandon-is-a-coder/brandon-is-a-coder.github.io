import { JobHistory } from '../ts/resume/resume'

export interface S {
  jobhistory: JobHistory[]
}

export const state: S = {
  jobhistory: []
}

export type State = typeof state
