import type { Note } from "../types";
import { NoteListItem } from "./NoteListItem";

type NoteListProps = {
    notes: Note[];
    selectedNoteId: string | null;
    onSelect: (id: string) => void;
    onDelete: (id: string) => void;
};

export function NoteList({
    notes,
    selectedNoteId,
    onSelect,
    onDelete
}: NoteListProps) {
    if (notes.length === 0) {
        return <p className="mt-4 text-secondary">No notes found.</p>;
    }

    return (
        <div
            className="row mt-4">
            {notes.map((note) => (
                <NoteListItem
                    key={note.id}
                    note={note}
                    isSelected={note.id === selectedNoteId}
                    onSelect={onSelect}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}
