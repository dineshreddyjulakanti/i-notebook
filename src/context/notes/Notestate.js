import NoteContext from './context'
import { useState } from 'react';
const Notestate = (props) => {
  const host = "http://localhost:4000";
  const notesIntial = []

  const [notes, setnote] = useState(notesIntial)

  //getallnotex
  const getnote = async () => {
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
    });
    // Api call
    // console.log("geting all note")
    const json = await response.json();
    // console.log(json)/
    setnote(json)
  }
  // Add note
  const addnote = async (title, description, tag) => {
    // Api call

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    // console.log(json)
    // logic
    // console.log("Adding note")
    const note = json
    setnote (notes.concat(note))


  }

  // Delete note
  const deletenote = async (id) => {
    //Api call

    const response = await fetch(`${host}/api/notes/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
    });

    const json = await response.json();
    // console.log(json)
    // setnote(notes.)

    // console.log("deleted")
    // console.log(id)
    const din = notes.filter((note) => { return note._id !== id })
    setnote(din)

  }
  //Edit note
  const editnote = async (id, title, description, tag) => {
    // Api call

    const response = await fetch(`${host}/api/notes/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json =  await response.json();
    // console.log(json)
    // JSON.parse(JSON.stringify(notes)) ante it is the deep copy of the notes
    let newnote = JSON.parse(JSON.stringify(notes))// This create the notes arrary
    // The logic for the editnote
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      // console.log(element._id + "element id ")
      if (element._id === id) {
        newnote[index].title = title;// new note is an array so in the notes it search for its specific place
        newnote[index].description = description;
        newnote[index].tag = tag;
        break;
      }
    }
    setnote(newnote)
  }
  return (
    <NoteContext.Provider value={{ notes, addnote, deletenote, editnote, getnote }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default Notestate;
