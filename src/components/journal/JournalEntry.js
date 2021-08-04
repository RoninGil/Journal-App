import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({...note}) => {
    const dispatch = useDispatch();
    const noteDate = moment(note.date);
    
    const handleEntryActivate = () => {
        dispatch(activeNote(note.id, note));
    }


    return (
        <div 
        className="journal__entry"
        onClick={handleEntryActivate}
        >
            {
            note.url && <div 
                className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url(${note.url})`
                }}
            >
            </div>
            }
            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    {note.title}
                </p>
                <p className="journal__entry-content">
                    {note.body}
                </p>
            </div>
            <div className="journal__entry-date">
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('Do')}</h4>
            </div>
        </div>
    )
}
