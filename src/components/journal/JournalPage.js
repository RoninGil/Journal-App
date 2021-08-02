import React from 'react';
import { NotePage } from '../notes/NotePage';
// import { NothingSelected } from './NothingSelected';
import { SideBar } from './SideBar';

export const JournalPage = () => {
    return (
        <div className="journal__main-content">
            <SideBar />

            <main>
                {/* <NothingSelected/> */}
                <NotePage />
            </main>
        </div>
    )
}
