import { useEffect, useMemo, useState } from "react";
import { getNotes, saveNotes } from "../notesStorage";
import type { Note, NoteInput } from "../types";

function createNote(input: NoteInput): Note {
    const now = new Date().toISOString();
    
    return {
        id: crypto.randomUUID(),
        title: input.title.trim(),
        content: input.content.trim(),
        createdAt: now,
        updatedAt: now,
    };
}

export function useNotes() {
    const [notes, setNotes] = useState<Note[]>(() => getNotes());
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedNoteId, setSelectedNoteId] = useState<string | null>(
        notes[0]?.id ?? null
    );

    useEffect(() => {
        saveNotes(notes);
    }, [notes]);

    const filteredNotes = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) {
            return notes;
        }

        return notes.filter(
            (note) =>
                note.title.toLowerCase().includes(term) ||
                note.content.toLowerCase().includes(term)
        );
    }, [notes, searchTerm]);

    const selectedNote = 
        notes.find((note) => note.id === selectedNoteId) ?? null;

    function addNote(input: NoteInput) {
        const newNote = createNote(input);
        setNotes((prevNotes) => [newNote, ...prevNotes]);
        setSelectedNoteId('');
    }

    function updateNote(id: string, input: NoteInput) {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === id
                    ? { 
                        ...note, 
                        title: input.title.trim(), 
                        content: input.content.trim(), 
                        updatedAt: new Date().toISOString() }
                    : note
            )
        );
    }

    function deleteNote(id: string) {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));

        setSelectedNoteId((current) =>
            current === id ? null : current
        );
    }

    function selectNote(id: string) {
        setSelectedNoteId(id);
    }

    return {
        notes,
        filteredNotes,
        searchTerm,
        setSearchTerm,
        selectedNote,
        selectedNoteId,
        addNote,
        updateNote,
        deleteNote,
        selectNote,
    };
}

