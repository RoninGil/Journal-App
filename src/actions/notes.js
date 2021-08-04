import Swal from 'sweetalert2';

import { db } from "../firebase/firebaseConfig";
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";


export const startNewNote = () => {
    return async(dispatch, getState) => {

        const {uid, name} = getState().auth;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }
        const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
        console.log(doc)
        dispatch(activeNote(doc.id, newNote));
        dispatch(addNewNote(doc.id, newNote));
    }
}

export const addNewNote = (id, newNote) => {
    return {
        type: types.notesAddNew,
        payload:{
            id, ...newNote
        }
    }
}

export const activeNote = (id, note) => {
    return {
        type: types.notesActive,
        payload: {
            id,
            ...note
        }
    }
}

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes))
    }
}

export const setNotes = ( notes ) => {
    return {
        type: types.notesLoad,
        payload: notes
    }
}

export const startSaveNote = (note) => {
    return async(dispatch, getState) => {

        const {uid} = getState().auth;

        if(!note.url){
            delete note.url;
        }

        const noteToSave = {...note};
        delete noteToSave.id; // borra la propiedad .id del noteTosave

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToSave);

        dispatch(refreshNote(note.id, noteToSave));
        Swal.fire('Note saved', note.title, 'success');
    }
}

export const refreshNote = (id, note) => {
    return {
        type: types.notesUpdate,
        payload: {
            id,
            note: {
                id,
                ...note
            }
        }
    }
}

export const startUploading = ( file ) => {
    return async (dispatch, getState) => {
        const {active:note} = getState().notes;

        Swal.fire({
            title: 'Uploading',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        })
        const fileUrl = await fileUpload(file);
        note.url = fileUrl;
        dispatch(startSaveNote(note))

        Swal.close();
    }
}


export const startDeleteNote = (id) => {
    return async (dispatch, getState) => {

        const {uid} = getState().auth;

        await db.doc(`${uid}/journal/notes/${id}`).delete();
        Swal.fire('Deleted Succesfully!', id, 'error');
        dispatch(deleteNote(id));
    }
}

export const deleteNote = (id) => {
    return {
        type: types.notesDelete,
        payload: id
    }
}

export const logoutNote = () => {
    return {
        type: types.notesLogoutCleaning
    }
}