"use client";
import { useEffect, useState } from "react";
import { marked } from "marked";
const apiBaseUrl = "http://localhost:3001/app";

export default function HomePage() {
  const [notes, setNotes] = useState<{ id: number; content: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch(apiBaseUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }
      const data = await response.json();
      setNotes(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setLoading(false);
    }
  };
  const handleDeleteNote = async (id: number) => {
    try {
      const response = await fetch(`${apiBaseUrl}/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error(`Failed to delete note with id ${id}`);
      }
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };
  if (loading) return <p>Loading...</p>;

  return (
    
    <div className="container">
      <h1>List api</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <div className="note-content" dangerouslySetInnerHTML={{ __html: marked(note.content) }} />
            <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>

  );
  
}
