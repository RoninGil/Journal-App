import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NotePage = () => {
    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input
                type="text"
                placeholder="Something to input"
                className="notes__title-input"
                />

                <textarea
                placeholder="Tell me a story..."
                className="notes__textarea"
                >

                </textarea>
                <div className="notes__image">
                    <img 
                    src="https://cdn.pixabay.com/photo/2019/12/11/21/18/landscape-4689328_960_720.jpg"
                    alt="landscape"
                    />
                    

                </div>

            </div>
        </div>
    )
}
