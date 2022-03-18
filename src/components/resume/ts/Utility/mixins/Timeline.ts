export interface Timeline {
  start: string,
  end: string
}

const maxDate = ['9999', '12', '31']

/**
 *
 * @param a
 * @param b
 * @returns {number}
 */
export function compareDates (a: Timeline, b: Timeline): number {
  let aStart: null | string[] = a.start.split('-')
  let bStart: null | string[] = b.start.split('-')
  let aEnd: null | string[] = a.end.split('-')
  let bEnd: null | string[] = b.end.split('-')

  if (!aStart || aStart.length === 0 || aStart[0].length === 0) aStart = maxDate
  if (!bStart || bStart.length === 0 || bStart[0].length === 0) bStart = maxDate
  if (!aEnd || aEnd.length === 0 || aEnd[0].length === 0) aEnd = maxDate
  if (!bEnd || bEnd.length === 0 || bEnd[0].length === 0) bEnd = maxDate

  if (aEnd[0] !== bEnd[0]) {
    return (Number(aEnd[0]) - Number(bEnd[0]))
  }

  if (aStart[0] !== bStart[0]) {
    return (Number(aStart[0]) - Number(bStart[0]))
  }

  if (aEnd.length === 1 || bEnd.length === 1) {
    return (Number(aEnd[1] ? aEnd[1] : 0) - Number(bEnd[1] ? bEnd[1] : 0))
  }

  if (aStart.length === 1 || bStart.length === 1) {
    return (Number(aStart[1] ? aStart[1] : 0) - Number(bStart[1] ? bStart[1] : 0))
  }

  if (aEnd.length === 2 || bEnd.length === 2) {
    return Number(aEnd[2] ? aEnd[2] : 0) - Number(bEnd[2] ? bEnd[2] : 0)
  }

  if (aStart.length === 2 || bStart.length === 2) {
    return Number(aStart[2] ? aStart[2] : 0) - Number(bStart[2] ? bStart[2] : 0)
  }

  return 0
}

export function compareDateStrings (a: string, b: string): number {
  let aDate: null | string[] = a.split('-')
  let bDate: null | string[] = b.split('-')

  if (aDate === null || aDate.length === 0 || aDate[0].length === 0) aDate = maxDate
  if (bDate === null || bDate.length === 0 || aDate[0].length === 0) bDate = maxDate

  if (aDate[0] !== bDate[0]) {
    return (Number(aDate[0]) - Number(bDate[0])) * 10000
  }

  // Will also catch when [0] === [0] since it will end up as 0 - 0
  if ((aDate.length === 1 || bDate.length === 1)) {
    return (Number(aDate[1] ? aDate[1] : 0) - Number(bDate[1] ? bDate[1] : 0)) * 100
  }

  if (aDate.length === 2 || bDate.length === 2) {
    return Number(aDate[2] ? aDate[2] : 0) - Number(bDate[2] ? bDate[2] : 0)
  }

  console.log('none')
  return 0
}
