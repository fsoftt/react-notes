import type { Note } from './types';

const STORAGE_KEY = 'notes-app.notes';

export function getNotes(): Note[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
        return [];
    }

    try {
        const notes = JSON.parse(raw) as Note[];
        return Array.isArray(notes) ? notes : [];
    } catch (error) {
        console.error('Failed to parse notes from localStorage:', error);
        return [];
    }
}

export function saveNotes(notes: Note[]): void {
    try {
        const raw = JSON.stringify(notes);
        localStorage.setItem(STORAGE_KEY, raw);
    } catch (error) {
        console.error('Failed to save notes to localStorage:', error);
    }
}
