import Head from 'next/head';
import { useState, useEffect } from 'react';
import Link from "next/link"
export default function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [authorName, setAuthorName] = useState('');

  // Fetch notes from the API
  useEffect(() => {
    fetch('/api/notes')
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.error('Failed to load notes:', err));
  }, []);

  // Add a new note
  const handleAddNote = async () => {
    if (noteText.trim() !== '' && authorName.trim() !== '') {
      try {
        const res = await fetch('/api/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: noteText, name: authorName }),
        });

        if (!res.ok) {
          throw new Error('Failed to save the note.');
        }

        const newNote = await res.json();
        setNotes((prevNotes) => [...prevNotes, newNote]);
        setNoteText(''); // Clear input
        setAuthorName(''); // Clear name input
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    
    <div className="text-white min-h-screen flex flex-col items-center py-10 px-5 sm:px-10">
      <div className="absolute   top-5 left-4 z-20">
        <Link href="/"
           className="sticky  left-1 px-3 py-3 text-2xl shadow-[0_4px_6px_rgba(192,192,192,0.5)] bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
            
          >
            🏠
        </Link>
      </div>
      <Head>
        <title>Notes </title>
        <meta name="description" content="Simple Notes App with JSON database" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <h1 className="text-4xl font-bold mb-6 text-yellow-400">🥸📝Anon Notes </h1>

      <div className="w-full max-w-md">
        {/* Input Section */}
        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-6">
          <input
            type="text"
            placeholder="Your name"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full sm:w-auto p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="text"
            placeholder="Write a new note..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            className="w-full sm:flex-grow p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            onClick={handleAddNote}
            className="w-full sm:w-auto px-4 py-2 bg-yellow-500 text-black font-semibold rounded-md shadow hover:bg-yellow-600 transition duration-200"
          >
            Add
          </button>
        </div>

        {/* Notes List */}
        <div className="space-y-3">
          {notes.length > 0 ? (
            notes.map((note) => (
              <div
                key={note.id}
                className="after:content relative mb-5 flex  flex-col  justify-right rounded-lg bg-white/10 p-3 text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0"

              >
                
                <p>{note.text}</p>
                <div className="text-sm text-gray-400  flex justify-end">~{note.name}</div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No notes yet. Start adding some!</p>
          )}
        </div>
      </div>
    </div>
  );
}
