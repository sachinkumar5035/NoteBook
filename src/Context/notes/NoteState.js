import React, { useState } from "react";
import NoteContext from "./noteContext";
// import { json } from "react-router-dom";


const NoteState = (props) => {

  // creates a state s1 which will be accessible to all the children 
  // const s1={
  //     "name":"sKumar",
  //     "class":"7A"
  // }

  // const [state,setState] = useState(s1);

  // const update=()=>{
  //     setTimeout(()=>{
  //         setState({
  //             "name" : "mrKumar",
  //             "class" : "10A"
  //         })
  //     },1500);
  // }

  const host = "http://localhost:4000"; // on this address mongodb is running
  // sample notes for a particular user
  const notesInitial = [];

  // try {
    const [notes, setNotes] = useState(notesInitial);


    // get all the notes;
    const getNotes = async () => {
      // API Call 
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      const json = await response.json()
      //console.log(json);
      // console.log(`${host}/api/notes/fetchallnotes`);
      setNotes(json);
    }



    // add a note
    const addNote = async (title, description, tag) => {
      // API call
      // const URL = host + '/api/notes/fetchallnotes'; // creating end point for the API for addNote
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        // body me hame title, description and tag dena h jaise ki addnote wali API me pass kiye the same vaise hi
        body: JSON.stringify({ title, description, tag })
      });
      //const json = response.json({title,description,tag});

      //console.log("Adding a new note ");
      const note = await response.json();
      //console.log(note);
      setNotes(notes.concat(note));
      
    }

    // delete a note
    const deleteNote = async (id) => { // id is require to delete a note
      // API call 
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        // API ki body me hame kuch bhi nhi dena h
      });
      //console.log("deleting a note with id: " + id);
      const newNote = notes.filter((note) => { return note._id !== id });
      setNotes(newNote);
      const json = await response.json();
      //console.log(json);
    }

    // edit a note 
    const editNote = async (id, title, description, tag) => { // id,title,description and tag is require to edit a note
      // API call
      //const URL = host + '/api/notes/updatenote/' + id; // creating end point for the API for editNote
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        // body me hame title, description and tag dena h jaise ki editnote wali API me body me pass kiye the same
        body: JSON.stringify({ title, description, tag })
      });
      // return response.json();
      const json = await response.json();
      //console.log(json);
      // for the client side
      let newNote = JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < newNote.length; index++) {
        const element = notes[index];
        if (element._id === id) {
          newNote[index].title = title;
          newNote[index].description = description;
          newNote[index].tag = tag;
          break;
        }
      }
      setNotes(newNote);
    }

    return (
      // state will be available to all the chil
      // <NoteContext.Provider value={{state,update}}> 
      <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes}}>
        {props.children}
      </NoteContext.Provider>
    )
  // } catch (error) {
  //     console.log(error.message);
  // }


}


export default NoteState;
