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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("title", title);
        console.log("content", content);

        const newNote:Note = {
            id: notes.length + 1,
            title: title,
            content: content
        }

        setNotes([...notes, newNote]);
        setTitle('');
        setContent('');
    }

    return (
        <div className="app-container">
            <form className="note-form"
                  onSubmit={(e) => handleSubmit(e)}
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
                <button type={"submit"}>
                    Add Note
                </button>
            </form>
            <div className="notes-grid">
                {
                    notes.map((note) => (
                        <div className="note-item" key={note.id}>
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