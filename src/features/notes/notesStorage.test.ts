import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getNotes, saveNotes } from './notesStorage';

const STORAGE_KEY = 'notes-app.notes';

describe('notesStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('returns an empty array when nothing is stored', () => {
    expect(getNotes()).toEqual([]);
  });

  it('saves notes to localStorage as JSON', () => {
    const notes = [
      {
        id: 'note-1',
        title: 'First note',
        content: 'Hello world',
        createdAt: '2026-09-01T00:00:00.000Z',
        updatedAt: '2026-09-01T00:00:00.000Z',
      },
    ];

    saveNotes(notes);

    expect(localStorage.getItem(STORAGE_KEY)).toBe(JSON.stringify(notes));
  });

  it('reads notes from localStorage and returns them', () => {
    const notes = [
      {
        id: 'note-2',
        title: 'Second note',
        content: 'Another note',
        createdAt: '2026-09-02T00:00:00.000Z',
        updatedAt: '2026-09-02T00:00:00.000Z',
      },
    ];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));

    expect(getNotes()).toEqual(notes);
  });

  it('returns an empty array when the stored value is invalid JSON or not an array', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    localStorage.setItem(STORAGE_KEY, '{not valid json');
    expect(getNotes()).toEqual([]);

    localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: 'not-an-array' }));
    expect(getNotes()).toEqual([]);

    expect(errorSpy).toHaveBeenCalledTimes(1);
  });
});
