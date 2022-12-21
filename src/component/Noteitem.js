import React, { useContext } from 'react'
import noteContext from '../Context/notes/noteContext';


const Noteitem = (props) => {
    const { note,updateNote } = props;
    const context = useContext(noteContext);
    const {deleteNote} = context; // taking deletenote using context-API
    return (
        <div className="col-md-3 my-2">
            {/* {note.title}
            {note.description} */}
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    {/* delete icon from font awesom calling a deletenote function passing note_id as parameter*/}
                    <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id);props.showAlert("Deleted successfuly","success");}}></i> 
                    {/* edit icon from font awesom */}
                    <i className="fa-regular fa-pen-to-square mx-2 " onClick={()=>{updateNote(note);}}></i>
                    {/* <a href="#" className="btn btn-primary">View Note</a> */}
                </div>
            </div>
        </div>
    )
}

export default Noteitem;