import React from 'react'
import noteContext from '../context/Small notes/noteContext'
import { useContext } from 'react'

export const NoteItem = (props) => {
    const { note, updateNote } = props
    const context = useContext(noteContext)
    const {deleteNote} = context
    return (
        <>
        <div className='col-md-4'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{note.tag}</h6>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-trash-can-arrow-up mx-2" style={{cursor: "pointer"}} onClick={()=>{deleteNote(note._id)}}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" style={{cursor: "pointer"}} onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>
        </div>
        </>
    )
}
