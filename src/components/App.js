import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';

function App() {

    return (
        <div className="App">
            <Header />
            <div className='main-screen'>
                <Navbar />
                <div className='outlet-container'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default App;
