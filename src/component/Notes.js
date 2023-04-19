import { React, useContext, useEffect, useState } from 'react'
import noteContext from '../context/Small notes/noteContext'
import { NoteItem } from './NoteItem'
import { AddNote } from './AddNote'
import {useNavigate} from 'react-router-dom'

export const Notes = () => {
    const context = useContext(noteContext)
    const { notes, getNote, editNote } = context
    const [note, setNote] = useState({ id:"", title: "", description: "", tag: "Default"})
    const navigate = useNavigate()
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNote()
        }
        else{
            navigate('/login')
        }
        // eslint-disable-line react-hooks/exhaustive-deps
    })

    const updateNote = ((curr_note) => {
        document.getElementById('modal').click()
        setNote({id: curr_note._id, title: curr_note.title, description: curr_note.description, tag: curr_note.tag})
    })

    const handleSubmit = ((e)=>{
        editNote(note.id, note.title, note.description, note.tag);
        document.getElementById("close").click();
        console.log(note);
    })

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <AddNote />
            <button type="button" id="modal" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" value={note.title} name="title" aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" value={note.description} name="description" id="description" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" name="tag" value={note.tag} id="tag" onChange={onChange} />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Add Note</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" id="close" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => {handleSubmit()}}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h2>Your Note's</h2>
                <div className="container">
                {notes.length===0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <NoteItem note={note} updateNote={updateNote} key={note._id} />
                })}
            </div>
        </div>
    )
}
