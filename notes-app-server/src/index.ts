import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());


// Create a new note
app.post('/api/notes', async (req, res) => {
    try {
        const note = await prisma.note.create({
            data: {
                title: req.body.title,
                content: req.body.content
            }
        });
        res.json(note);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create note' });
    }
});

// Find all notes
app.get('/api/notes',  async (req, res) => {
    try {
        const notes = await prisma.note.findMany();
        res.json(notes); // Note: You might want to send the actual notes, not just a success message.
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notes' });
    }
});

// FindOneById
app.get('/api/notes/:id', async (req, res) => {
    try {
        const note = await prisma.note.findUnique({
            where: {
                id: parseInt(req.params.id) || undefined
            }
        });
        res.json(note);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch note' });

    }
});

// Update a note
app.put('/api/notes/:id', async (req, res) => {
    try {
        const note = await prisma.note.update({
            where: {
                id: parseInt(req.params.id) || undefined
            },
            data: {
                title: req.body.title,
                content: req.body.content
            }
        });
        res.json(note);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update note' });
    }
});

// Delete a note
app.delete('/api/notes/:id', async (req, res) => {
    try {
        const note = await prisma.note.delete({
            where: {
                id: parseInt(req.params.id) || undefined
            }
        });
        res.json(note);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete note' });
    }
});


app.listen(5000, () => {
    console.log('Server running on port 5000');
});