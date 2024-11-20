import { describe, it, expect, vi } from 'vitest';
import { dateDisplay, timeDisplay, durationDisplay } from './date-time-display';

const mockToday = new Date(2024, 11, 20);
Date.now = vi.fn(() => mockToday.getTime());

describe('dateDisplay', () => {
  it('returns "Today" for the current date', () => {
    expect(dateDisplay('2024-11-20')).toBe('Today');
  });

  it('returns "Tomorrow" for the next day', () => {
    expect(dateDisplay('2024-11-21')).toBe('Tomorrow');
  });

  it('returns formatted date for other days', () => {
    expect(dateDisplay('2024-11-22')).toBe('Friday, Nov 22');
  });
});

describe('timeDisplay', () => {
  it('returns formatted time', () => {
    expect(timeDisplay('2024-11-20T14:30:00')).toBe('02:30 PM');
  });
});

describe('durationDisplay', () => {
  it('returns "00:30" for 0.5 hours', () => {
    expect(durationDisplay(0.5)).toBe('00:30');
  });

  it('returns "1:00" for 1 hour', () => {
    expect(durationDisplay(1)).toBe('1:00');
  });

  it('returns "1:30" for 1.5 hours', () => {
    expect(durationDisplay(1.5)).toBe('1:30');
  });

  it('returns "2:00" for 2 hours', () => {
    expect(durationDisplay(2)).toBe('2:00');
  });
});
