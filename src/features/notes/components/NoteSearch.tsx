type NoteSearchProps = {
    value: string;
    onChange: (value: string) => void;
};

export function NoteSearch({ value, onChange }: NoteSearchProps) {
    return (
        <div className="d-flex gap-2 align-items-center">
            <label 
                htmlFor="note-search" 
                className="form-label m-0">
                Search
            </label>
            <input
                id="note-search"
                className="form-control"
                placeholder="Search notes..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}