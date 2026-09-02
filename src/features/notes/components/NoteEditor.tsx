import { useEffect, useState } from "react";
import type { Note, NoteInput } from "../types";

type NoteEditorProps = {
    note: Note | null;
    onSave: (input: NoteInput, id?: string) => void;
    onClean: () => void;
};

const emptyForm: NoteInput = {
    title: "",
    content: "",
};

export function NoteEditor({ note, onSave, onClean }: NoteEditorProps) {
    const [form, setForm] = useState<NoteInput>(emptyForm);

    useEffect(() => {
        if (note) {
            setForm({
                title: note.title,
                content: note.content,
            });
        } else {
            setForm(emptyForm);
        }
    }, [note]);

    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        onSave(form, note?.id);
        setForm(emptyForm);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col">
                    <label 
                        htmlFor="note-title" 
                        className="form-label w-100">
                        Title
                        <input
                            id="note-title"
                            className="form-control"
                            type="text"
                            value={form.title}
                            onChange={(e) =>
                                setForm((prev) => ({ ...prev, title: e.target.value }))
                            }
                        />
                    </label>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label
                        htmlFor="note-content" 
                        className="form-label w-100">
                        Content
                        <textarea
                            id="note-content"
                            className="form-control"
                            value={form.content}
                            onChange={(e) =>
                                setForm((prev) => ({ ...prev, content: e.target.value }))
                            }
                        />
                    </label>
                </div>
            </div>

            <div className="row">
                <div className="col d-flex justify-content-end gap-2">
                    <button 
                        type="reset"
                        className="btn btn-secondary mt-3 flex-end"
                        onClick={() => onClean()}>
                        Clear
                    </button>
                    <button 
                        type="submit"
                        className="btn btn-primary mt-3 flex-end">
                        {note ? "Update Note" : "Add Note"}
                    </button>
                </div>
            </div>
        </form>
    );
}
