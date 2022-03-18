import history from '@/assets/history.json'
import { Indexable } from '@/components/resume/ts/Utility/mixins/Indexable'
import { Visibility, VisibilityOptions } from '@/components/resume/ts/Utility/mixins/Visibility'
import { Cartesian } from '@/components/resume/ts/Utility/mixins/Cartesian'
import { Timeline } from '@/components/resume/ts/Utility/mixins/Timeline'

export interface JobListing extends Timeline {
  org: string;
  roles: string[];
  tags: string[];
}

export interface JobDetails extends Timeline {
  org: string;
  role: string;
  description: string;
  requirements: string[];
  highlights: string[];
  tags: string[];
}

export interface JobHistory extends Indexable, Visibility, Cartesian {
  details: JobDetails
}

export function getCopyOfHistory (): JobDetails[] {
  return [...history]
}

export function getJobHistory (): JobHistory[] {
  const fullHistory: JobHistory[] = []
  const copyOfHistory = getCopyOfHistory()

  for (let i = 0; i < copyOfHistory.length; i++) {
    const jobHistory: JobHistory = {
      coordinates: { x: i },
      details: copyOfHistory[i],
      index: i,
      visibility: [VisibilityOptions.CONDENSED]
    }
    fullHistory.push(jobHistory)
  }

  return fullHistory
}
