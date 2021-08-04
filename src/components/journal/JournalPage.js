import React from 'react';
import { useSelector } from 'react-redux';
import { NotePage } from '../notes/NotePage';
import { NothingSelected } from './NothingSelected';
import { SideBar } from './SideBar';

export const JournalPage = () => {

    const {active} = useSelector(state => state.notes)

    return (
        <div className="journal__main-content">
            <SideBar />

            <main>
                {!active 
                ?
                <NothingSelected/>
                :
                <NotePage />}
            </main>
        </div>
    )
}
