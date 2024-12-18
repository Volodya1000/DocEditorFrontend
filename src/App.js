import React, { useState } from 'react';
import StartupPage from './components/StartupPage';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/HomePage';
import DocumentEditor from './components/DocumentEditor';
import Settings from './components/Settings';
import Read from './components/ReadDocument';
import DocumentSettings from './components/DocumentSettings';


function App() {
    const [currentPage, setCurrentPage] = useState('startup');


    const navigateTo = (page) => {
        setCurrentPage(page);
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'startup':
                return <StartupPage navigateTo={navigateTo} />;
            case 'register':
                return <Register navigateTo={navigateTo} />;
            case 'login':
                return <Login navigateTo={navigateTo} />;
            case 'home':
                return <HomePage navigateTo={navigateTo} />;
            case 'editor':
                return <DocumentEditor navigateTo={navigateTo} />;
            case 'settings':
                return <Settings navigateTo={navigateTo} />;
            case 'read':
                return <Read navigateTo={navigateTo} />;
            case 'doc_settings':
                return <DocumentSettings navigateTo={navigateTo} />;
            default:
                return <StartupPage navigateTo={navigateTo} />;
        }
    };

    return (
        <div>
            {renderPage()}
        </div>
    );
}

export default App;
