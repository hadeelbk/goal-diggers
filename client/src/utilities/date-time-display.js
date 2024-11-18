import { format, differenceInCalendarDays } from 'date-fns';

export function dateDisplay(date) {
  const today = new Date()
  const daysDiff = differenceInCalendarDays(new Date(date), today)

  if (daysDiff === 0) {
    return 'Today'
  } else if (daysDiff === 1) {
    return 'Tomorrow'
  } else {
    return format(new Date(date), "EEEE, MMM d")
  }
}

export function timeDisplay(time) {
  return format(new Date(time), 'hh:mm aa')
}

export function durationDisplay(duration) {
  if (duration === 0.5) {
    return '00:30'
  } else if (duration === 1) {
    return '1:00'
  } else if (duration === 1.5) {
    return '1:30'
  } else {
    return '2:00'
  }
}