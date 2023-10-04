import './App.css';
import React, {useEffect, useState} from "react";

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


    const handleAddNote = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/notes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title,
                        content
                    }),
                }
            );
            if (response.ok) {
                const newNote: Note = await response.json();
                setNotes([...notes, newNote]);
                setTitle('');
                setContent('');
            }
        } catch (e) {
            console.log(e);
        }

    };

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/notes');
                const notes: Note[] = await response.json();
                setNotes(notes);
            } catch (e) {
                console.log(e);
            }
        };
        fetchNotes();
    }, []);

    const handleNoteClick = (note: Note) => {
        setSelectedNote(note)
        setTitle(note.title);
        setContent(note.content);
    };

    const handleUpdateNote =  async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/notes/${selectedNote?.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title,
                        content
                    }),
                }
            );
            if (response.ok) {
                const updatedNote: Note = await response.json();
                const updatedNotes = notes.map((note) => {
                    if (note.id === updatedNote.id) {
                        return updatedNote;
                    }
                    return note;
                });
                setNotes(updatedNotes);
                setTitle('');
                setContent('');
                setSelectedNote(null);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleCancel = () => {
        setTitle('');
        setContent('');
        setSelectedNote(null);
    };

    const deleteNote = async (event: React.MouseEvent, noteId: number) => {
        try {
            event.stopPropagation();
            const response = await fetch(`http://localhost:5000/api/notes/${noteId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                const updatedNotes = notes.filter((note) => note.id !== noteId);
                setNotes(updatedNotes);
            }
        } catch (e) {
            console.log(e);
        }
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
                                <button onClick={(e) => deleteNote(e, note.id)}>x</button>
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