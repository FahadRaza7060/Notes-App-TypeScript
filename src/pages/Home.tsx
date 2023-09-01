import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import Button from "@mui/material/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { supabase } from "../client";

import { useAppSelector } from "../redux/hooks";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6] }],
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike"], 
  ],
};

interface Note {
  id: number;
  title: string;
  content: string;
}

function Home() {

  const selectedId = useAppSelector(state => state.userId);

  const [notes, setNotes] = useState<Note[]>([]);
  const [note, setNote] = useState<Note>({
  id: 0, title: "", content: ""
  });
  const [isEditMode, setIsEditMode] = useState(false);

  async function fetchNotes() { 
    const res = await supabase.from("notes")
    .select("*")
    .eq("userId", selectedId);
   
    if (res.data) {
      setNotes(res.data);
    }

    if (res.error) {
      console.error(res.error);
    }
  }

  useEffect(() => {
    fetchNotes();
  });


  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | string) => {
    if (typeof event === 'string') { 
      setNote((prevData) => ({
        ...prevData,
        content: event,
      }));
    } else { 
    const { name, value } = event.target;
    setNote((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  };

  async function createNote(event: React.FormEvent) {
    event.preventDefault();

    const parser = new DOMParser();
    const parsedContent = parser.parseFromString(note.content, "text/html");
    const textContent = parsedContent.body.textContent;

    if (isEditMode) {
        await supabase
        .from("notes")
        .update({ title: note.title, content: textContent, userId: selectedId })
        .eq("id", note.id);
    } else {
      await supabase
      .from("notes")
      .insert({
        title: note.title,
        content: textContent,
        userId: selectedId,
      });
    }

    fetchNotes();

    setNote({
      id: 0,
      title: "",
      content: "",
    });

    setIsEditMode(false);
  }

  async function deleteNote(noteId: number) {
    const { data, error } = await supabase
      .from("notes")
      .delete()
      .eq("id", noteId);

    fetchNotes();

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
  }

  function editNote(noteId: number) {
    const selectedNote = notes.find((note) => note.id === noteId);
    if (selectedNote) {
      setNote({
        id: selectedNote.id,
        title: selectedNote.title,
        content: selectedNote.content,
      });
      setIsEditMode(true);
    }
  }

  return (
    <>
      <div className="home-container">
        <form onSubmit={createNote}>
          <div className="input">
            <input
              type="text"
              placeholder="Note Title"
              name="title"
              onChange={handleChange}
              value={note.title}
            />
          </div>
          <div className="quill">
            <ReactQuill
            className="editor-input"
              theme="snow"
              data-name="content"
              onChange={handleChange}
              value={note.content}
              modules={modules}
            />
          </div>
          <div className="quill_btn">
            <Button type="submit" variant="contained">
              {isEditMode ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </div>

      <div className="notes_upper_container">
        <div className="notes_inner_container">
        {notes.map((note) => (
        <Card sx={{ maxWidth: 300, margin: 2 }} key={note.id}>
        <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {note.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {note.content.slice(0, 100)}...
          </Typography>
        </CardContent>
      </CardActionArea>
      <div className="card-buttons">
        <Button variant="contained" onClick={() => deleteNote(note.id)}>
          Delete
        </Button>
        <Button variant="contained" onClick={() => editNote(note.id)}>
          Edit
        </Button>
      </div>
    </Card>
     ))}
        </div>
      </div>
    </>
  );
}

export default Home;
