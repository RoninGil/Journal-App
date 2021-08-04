import { useEffect } from "react";
import { db } from "../firebase/firebaseConfig"

export const loadNotes = async(uid) => {
    const getNotes = await db.collection(`${uid}/journal/notes`).orderBy('date', 'desc').get();
    const notes = [];

    getNotes.forEach( note => {
        notes.push({
            id: note.id,
            ...note.data()
        })
    })
    console.log(notes);
    
    return notes;
}
