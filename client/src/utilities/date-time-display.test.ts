import { describe, it, expect, vi } from 'vitest';
import { dateDisplay, timeDisplay, durationDisplay } from './date-time-display'; // adjust the import path as needed

// Mock the current date
const mockCurrentDate = new Date('2024-10-01T12:00:00Z'); // Use UTC time to avoid timezone issues
vi.useFakeTimers();
vi.setSystemTime(mockCurrentDate);

describe('dateDisplay', () => {
  it('returns "Today" for the current date', () => {
    const result = dateDisplay('2024-10-01');
    expect(result).toBe('Today');
  });

  it('returns "Tomorrow" for the next day', () => {
    const result = dateDisplay('2024-10-02');
    expect(result).toBe('Tomorrow');
  });

  it('returns a formatted date for other days', () => {
    const result = dateDisplay('2024-10-03');
    expect(result).toBe('Thursday, Oct 3');
  });
});

describe('timeDisplay', () => {
  it('formats time correctly', () => {
    expect(timeDisplay('2024-10-01T15:45:00')).toBe('03:45 PM');
    expect(timeDisplay('2024-10-01T00:00:00')).toBe('12:00 AM');
  });
});

describe('durationDisplay', () => {
  it('formats duration for half an hour', () => {
    expect(durationDisplay(0.5)).toBe('00:30');
  });

  it('formats duration for one hour', () => {
    expect(durationDisplay(1)).toBe('1:00');
  });

  it('formats duration for one and a half hours', () => {
    expect(durationDisplay(1.5)).toBe('1:30');
  });

  it('formats duration for two hours', () => {
    expect(durationDisplay(2)).toBe('2:00');
  });
});
