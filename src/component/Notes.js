import React, { useContext, useEffect, useRef,useState } from 'react'
import noteContext from "../Context/notes/noteContext";
import AddNote from './AddNote';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes,editNote } = context; // editNote id for update the note, getNote is for get all the notes using context API
    const [note,setNote] = useState({id:"",etitle:"" ,edescription:"", etag:""});

    let navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }
        else{
            // redirect to login page
            navigate("/login"); 
        }
        
    }, []);


    const ref = useRef(null);
    const refClose = useRef(null);


    // adding a note
    const updateNote = (currentNode) => {
        ref.current.click();
        setNote({id:currentNode._id,etitle: currentNode.title, edescription:currentNode.description,etag:currentNode.tag});
        // props.showAlert("Note updated successfuly","success");
    }


    const handleClick=(e)=>{
        console.log("updating the note",note);
        editNote(note.id,note.etitle,note.edescription,note.etag); // updating the note with the new title, description and tag
        refClose.current.click(); // to close the form 
        // e.preventDefault(); // page will not reload
        props.showAlert("Updated successfuly","success")
    }


    const onChange=(event)=>{
        setNote({...note,[event.target.name]:event.target.value});
    }


    return (
        <>
        {/* prop dilling */}
            <AddNote showAlert={props.showAlert} />
            {/* <!-- Button trigger modal --> */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* form will be populated same as a addnote */}
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Descrption</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>



            <div className="row my-3">
                <h2>Your Note</h2>
                <div className='mx-2'>
                    {/* when note is not available */}
                    {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map((note) => { // all notes title will be shown
                    // returning Noteitem by passing note as prpos and key as _id for a note 
                    return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes;
