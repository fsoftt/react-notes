import type { Note } from '../types';

type NoteListItemProps = {
    note: Note;
    isSelected: boolean;
    onSelect: (id: string) => void;
    onDelete: (id: string) => void;
};

export function NoteListItem({ 
    note, 
    isSelected, 
    onSelect, 
    onDelete 
}: NoteListItemProps) {
    return (
        <div className="col-sm-12 col-md-6 col-lg-3">
            <div 
                className="card mb-3">
                <div 
                    className="card-body">
                    <h5 
                        className="card-title">
                            {note.title || "Untitled"}
                    </h5>
                    <p 
                        className="card-text">
                            {note.content || "No content"}
                    </p>
                    <div className="d-flex justify-content-end gap-2">
                        <button 
                            className="btn btn-primary" 
                            onClick={() => onSelect(note.id)}>
                            Select
                        </button>
                        <button
                            className="btn btn-danger" 
                            onClick={() => onDelete(note.id)}
                            aria-pressed={isSelected}>
                                Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
