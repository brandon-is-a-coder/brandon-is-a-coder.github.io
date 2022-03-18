import { GetterTree } from 'vuex'
import { State } from './state'
import { JobListing } from '@/components/resume/ts/resume/resume'
import { compareDateStrings } from '@/components/resume/ts/Utility/mixins/Timeline'

export type Getters = {
  GET_JOBS (state: State): JobListing[];
  GET_TAGS (state: State): string[];
}

export const getters: GetterTree<State, State> & Getters = {
  GET_JOBS (state: State): JobListing[] {
    const joblistings: JobListing[] = []

    for (const i in state.jobhistory) {
      let found = false

      const tmpJobListing: JobListing = {
        org: state.jobhistory[i].details.org,
        start: state.jobhistory[i].details.start,
        end: state.jobhistory[i].details.end,
        tags: [...state.jobhistory[i].details.tags],
        roles: [state.jobhistory[i].details.role]
      }

      for (const j in joblistings) {
        if (joblistings[j].org === state.jobhistory[i].details.org) {
          // Merge them
          if (compareDateStrings(tmpJobListing.start, joblistings[j].start) < 0) {
            joblistings[j].start = tmpJobListing.start
          }

          if (compareDateStrings(tmpJobListing.end, joblistings[j].end) > 0) {
            joblistings[j].end = tmpJobListing.end
          }
          joblistings[j].tags = joblistings[j].tags.concat(tmpJobListing.tags)
          joblistings[j].roles = joblistings[j].roles.concat(tmpJobListing.roles)
          found = true
          break
        }
      }

      if (!found) {
        joblistings.push(tmpJobListing)
      }
    }

    return joblistings
  },
  GET_TAGS (state: State): string[] {
    const tags = new Set<string>()
    for (const i in state.jobhistory) {
      for (const tag of state.jobhistory[i].details.tags) {
        tags.add(tag)
      }
    }
    return [...tags]
  }
}
