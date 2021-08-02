import React from 'react'

export const JournalEntry = () => {
    return (
        <div className="journal__entry">
            <div 
                className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://www.muycomputer.com/wp-content/uploads/2019/05/HubbleLegacyField.jpg)'
                }}
            >
            </div>
            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    Dawn of a new day...
                </p>
                <p className="journal__entry-content">
                    Welcome to the end...
                </p>
            </div>
            <div className="journal__entry-date">
                <span>Monday</span>
                <h4>28</h4>
            </div>
        </div>
    )
}
