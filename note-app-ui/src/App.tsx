import './App.css';
import React, {useState} from "react";

export type Note = {
    id: number;
    title: string;
    content: string;
};

const App = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    const handleAddNote = (e: React.FormEvent) => {
        e.preventDefault();

        const newNote: Note = {
            id: notes.length + 1,
            title: title,
            content: content
        }

        setNotes([...notes, newNote]);
        setTitle('');
        setContent('');
    };

    const handleNoteClick = (note: Note) => {
        setSelectedNote(note)
        setTitle(note.title);
        setContent(note.content);
    };

    const handleUpdateNote = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedNote) {
            return;
        }

        const updatedNote: Note = {
            id: selectedNote.id,
            title: title,
            content: content
        };

        const updatedNotesList = notes.map((note) =>
            note.id === selectedNote.id
                ? updatedNote
                : note
        );

        setNotes(updatedNotesList);
        setTitle('');
        setContent('');
        setSelectedNote(null);
    }

    const handleCancel = () => {
        setTitle('');
        setContent('');
        setSelectedNote(null);
    }

    return (
        <div className="app-container">
            <form className="note-form"
                  onSubmit={(e) => handleAddNote(e)}
            >
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                    rows={10}
                    required
                >
            </textarea>
                { selectedNote ? (
                    <div className={"edit-buttons"}>
                        <button onClick={handleUpdateNote}>Save</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                ) : (
                    <button type={"submit"}>
                        Add Note
                    </button>
                )}
            </form>
            <div className="notes-grid">
                {
                    notes.map((note) => (
                        <div
                            className="note-item"
                            key={note.id}
                            onClick={() => handleNoteClick(note)}
                        >
                            <div className="notes-header">
                                <button>x</button>
                            </div>
                            <h2>{note.title}</h2>
                            <p>{note.content}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default App;