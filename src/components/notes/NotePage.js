import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleteNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NotePage = () => {

    const dispatch = useDispatch();

    const {active:note} = useSelector(state => state.notes);
    const [formData, handleInputChange, reset]=useForm(note);
    const {body, title} = formData;

    const activeId = useRef(note.id); //ESTO ES IMPORTANTE PARA REDIBUJAR LA INFO DEL COMPONENTE :D

    useEffect(() => {
        
        if(note.id !== activeId.current){
            reset(note);
            activeId.current=note.id;
        }

    }, [note, reset])

    useEffect(() => {
        dispatch(activeNote(formData.id, {...formData}));
    }, [formData, dispatch])

    const handleDeleteNote = () =>{
        dispatch(startDeleteNote(formData.id));
    }

    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input
                type="text"
                placeholder="Something to input"
                className="notes__title-input"
                name="title"
                value = {title}
                onChange={handleInputChange}
                />

                <textarea
                placeholder="Tell me a story..."
                className="notes__textarea"
                name="body"
                value={body}
                onChange={handleInputChange}
                >

                </textarea>
                {
                    note.url &&
                    <div className="notes__image">
                        <img 
                        src={note.url}
                        alt="landscape"
                        />
                </div>
                }

            </div>
            <button 
            className="btn btn-danger"
            onClick = {handleDeleteNote}
            >
                Delete

            </button>
        </div>
    )
}
