import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get('/api/notes',  async (req, res) => {
    try {
        const notes = await prisma.note.findMany();
        res.json(notes); // Note: You might want to send the actual notes, not just a success message.
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notes' });
    }
});
app.listen(5000, () => {
    console.log('Server running on port 5000');
});