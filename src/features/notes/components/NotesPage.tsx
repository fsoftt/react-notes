import { useNotes } from '../hooks/useNotes';
import { NoteEditor } from './NoteEditor';
import { NoteList } from './NoteList';
import { NoteSearch } from './NoteSearch';

export function NotesPage() {
    const {
        filteredNotes,
        searchTerm,
        setSearchTerm,
        selectedNote,
        addNote,
        updateNote,
        deleteNote,
        selectNote
    } = useNotes();

    function handleSave(input: {title: string, content: string}, id?: string) {
        if (id) {
            updateNote(id, input);
        } else {
            addNote(input);
        }

        handleClean();
    }

    function handleClean() {
        selectNote('');
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1 className="mt-3 mb-5">Notes</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-3 mb-5" style={{ borderRight: "1px solid #ccc" }}>
                    <NoteEditor note={selectedNote} onSave={handleSave} onClean={handleClean} />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-9 ps-4">
                    <div className="row">
                        <div className="col">
                            <NoteSearch value={searchTerm} onChange={setSearchTerm} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                        <NoteList
                            notes={filteredNotes}
                            selectedNoteId={selectedNote?.id ?? null}
                            onSelect={selectNote}
                            onDelete={deleteNote}
                        />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
