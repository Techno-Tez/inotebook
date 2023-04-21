import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "https://inotebook-back.onrender.com/"
  const initialNote = []
  const [notes, setNotes] = useState(initialNote)

  // GET NOTES 
  const getNote = async () => {

    // API CALL 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json= await response.json()
    setNotes(json)
    // eslint-disable-next-line
  }
  // Add a note
  const addNote = async (title, description, tag) => {
    // API CALL 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json()
    console.log(json)
    getNote()
    // eslint-disable-next-line
  }
  // Delete a note
  const deleteNote = async (id) => {
    // API CALL 
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = response.json()
    console.log(json)
    getNote()
    // eslint-disable-next-line
  }

  // Edit a note 
  const editNote = async (id, title, description, tag) => {

    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json)

    // logic to edit a note 
    getNote()
    // eslint-disable-next-line
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;