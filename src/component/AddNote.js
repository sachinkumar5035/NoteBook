import React, { useState } from 'react'
import { useContext } from 'react';
import noteContext from '../Context/notes/noteContext';

const AddNote = (props) => {

    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });


    const handleClick = (e) => {

        e.preventDefault(); // page will not reload
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Note added successfuly","success")
    }

    const onChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value });
    }

    return (

        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                {/* <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descrption</label>
                    <input type="text" className="form-control" id="description" value={note.description} name="description" onChange={onChange}/>
                </div> */}
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descrption</label>
                    <textarea type="text" className="form-control" rows={10} id="description" name="description" value={note.description} onChange={onChange} ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>

    )
}

export default AddNote;
