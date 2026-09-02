import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useNotes } from './useNotes';

const STORAGE_KEY = 'notes-app.notes';

const initialNotes = [
  {
    id: 'note-1',
    title: 'Alpha',
    content: 'First note',
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-09-01T00:00:00.000Z',
  },
  {
    id: 'note-2',
    title: 'Beta',
    content: 'Second note',
    createdAt: '2026-09-02T00:00:00.000Z',
    updatedAt: '2026-09-02T00:00:00.000Z',
  },
];

describe('useNotes', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('loads persisted notes and selects the first note by default', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialNotes));

    const { result } = renderHook(() => useNotes());

    expect(result.current.notes).toEqual(initialNotes);
    expect(result.current.selectedNoteId).toBe('note-1');
    expect(result.current.selectedNote).toEqual(initialNotes[0]);
  });

  it('adds a new note and clears the selected id after creation', () => {
    vi.spyOn(globalThis.crypto, 'randomUUID').mockReturnValue('new-note-1');

    const { result } = renderHook(() => useNotes());

    act(() => {
      result.current.addNote({ title: '  New title  ', content: '  New content  ' });
    });

    expect(result.current.notes).toHaveLength(1);
    expect(result.current.notes[0]).toMatchObject({
      id: 'new-note-1',
      title: 'New title',
      content: 'New content',
    });
    expect(result.current.selectedNoteId).toBe('');
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')).toHaveLength(1);
  });

  it('filters notes case-insensitively by the search term', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialNotes));

    const { result } = renderHook(() => useNotes());

    act(() => {
      result.current.setSearchTerm('beta');
    });

    expect(result.current.filteredNotes).toEqual([initialNotes[1]]);

    act(() => {
      result.current.setSearchTerm('NOTE');
    });

    expect(result.current.filteredNotes).toEqual(initialNotes);
  });

  it('updates and deletes notes while keeping selection in sync', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialNotes));

    const { result } = renderHook(() => useNotes());

    act(() => {
      result.current.selectNote('note-2');
    });

    act(() => {
      result.current.updateNote('note-2', { title: ' Updated ', content: '  Updated body  ' });
    });

    expect(result.current.notes[1]).toMatchObject({
      id: 'note-2',
      title: 'Updated',
      content: 'Updated body',
    });
    expect(result.current.selectedNoteId).toBe('note-2');

    act(() => {
      result.current.deleteNote('note-2');
    });

    expect(result.current.notes).toEqual([initialNotes[0]]);
    expect(result.current.selectedNoteId).toBeNull();
    expect(result.current.selectedNote).toBeNull();
  });
});
