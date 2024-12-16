import fs from 'fs';
import path from 'path';

const notesFilePath = path.join(process.cwd(), 'data', 'notes.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Read notes from the file
    try {
      const data = fs.readFileSync(notesFilePath, 'utf8');
      const notes = JSON.parse(data);
      res.status(200).json(notes);
    } catch (err) {
      res.status(500).json({ message: 'Failed to read notes.' });
    }
  } else if (req.method === 'POST') {
    // Add a new note with name and timestamp
    const { text, name } = req.body;
    if (!text || typeof text !== 'string' || !name || typeof name !== 'string') {
      return res.status(400).json({ message: 'Invalid note text or name.' });
    }

    try {
      const data = fs.readFileSync(notesFilePath, 'utf8');
      const notes = JSON.parse(data);

      const newNote = {
        id: Date.now(),
        text,
        name,
        timestamp: new Date().toLocaleString(), // Store timestamp in a readable format
      };

      notes.push(newNote);
      fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2));
      res.status(201).json(newNote);
    } catch (err) {
      res.status(500).json({ message: 'Failed to save the note.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
