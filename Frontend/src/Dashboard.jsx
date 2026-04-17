import './Dashboard.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListItem from './assets/ListItem';

function Dashboard() {
    //Used for the logout button
    const navigate = useNavigate();
    //Used in the dashboard for selecting items to bring up questions
    const [selectedItem, setSelectedItem] = useState(null);
    
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Get username from localStorage (saved during login/registration)
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
        fetchGames();
    }, []);

    const fetchGames = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_GAMES_LINK);
            if (!response.ok) {
                throw new Error('Failed to fetch games');
            }
            const data = await response.json();
            setItems(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching games:', error);
            setError('Error loading games');
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('username');
        navigate('/');
    };

    return (
        <>
            <div>
                {/*Line Divider*/}
                <div className='top-lined-spacer row'></div>
                <div className='header-row'>
                    <h1 className='dashboard-title column'>The Gamer's Gaze</h1>
                    <div className='dashboard-user-container column'>
                        <h2 className='dashboard-user'>Welcome, {username || 'Guest'}</h2>
                        <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} className='logout-link'>Logout</a>
                    </div>
                </div>
                
                {/*Line Divider*/}
                <div className='top-lined-spacer'></div>
                {/*Line Divider*/}
                <div className='dotted-spacer'></div>
                
                
                <div className="dashboard-content">
                    {/*Vertical Style Bars*/}
                <div className="left-vertical-bar"></div>
                <div className="right-vertical-bar"></div>
                    <div className="dashboard-container">

                        {/* Left Panel - List Items */}
                        <div className="list-panel">
                            <h2>Categories</h2>
                            {loading && <p style={{ color: 'white' }}>Loading categories...</p>}
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <div className="list-container">
                                {items.map((item) => (
                                    <ListItem
                                        key={item.id}
                                        item={item}
                                        isSelected={selectedItem?.id === item.id}
                                        onSelect={setSelectedItem}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Right Panel - Questions */}
                        <div className="questions-panel">
                            {selectedItem ? (
                                <>
                                    <h2>{selectedItem.title}</h2>
                                    <div className="questions-container">
                                        {selectedItem.questions.map((question, index) => (
                                            <div key={index} className="question-item">
                                                <p>{question}</p>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="no-selection">
                                    <p>Select a category to view questions</p>
                                </div>
                            )}
                        </div>
                    </div>
                    
                </div>
                {/*Line Divider*/}
                    <div className='bottom-dotted-spacer'></div>
                    {/*Line Divider*/}
                    <div className='top-lined-spacer'></div>
            </div>
        </>
    )
}
export default Dashboard