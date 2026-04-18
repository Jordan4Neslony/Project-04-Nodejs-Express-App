import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    
    //Variables that are used to track the data in the input boxes.
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    //Error variable is used set the error message by the input box.
    const [error, setError] = useState('');
    //Success variable is used set the success message by the input box.
    const [success, setSuccess] = useState('');
    //Sends data to the backend to see if the user is valid to log in.
    const sendData = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        try {
            const response = await fetch(import.meta.env.VITE_LOGIN_LINK, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                setError(result.message);
            } else {
                setSuccess(result.message);
                // Save username to localStorage
                localStorage.setItem('username', formData.username);
                setFormData({ username: '', password: '' });
                // Redirect to dashboard after successful login
                setTimeout(() => navigate('/dashboard'), 1500);
            }
            console.log('Response:', result);
        } catch (error) {
            console.error('Error:', error);
            setError('Error connecting to server');
        }
    }
    
    return (
        <>
            <div>
                {/*Vertical Style Bars*/}
                <div className="left-vertical-bar"></div>
                <div className="right-vertical-bar"></div>
                {/*Line Divider*/}
                <div className='lined-spacer'></div>
                {/*Line Divider*/}
                <div className='dotted-spacer'></div>

                {/*Login Container*/}
                <form onSubmit={sendData} className='login-container'>
                    <h1>Login</h1>
                    {error && <p className='error-message'>{error}</p>}
                    {success && <p className='success-message'>{success}</p>}
                    <h4 className='login-contents'>Username</h4>
                    <input type="text" value={formData.username} onInput={(input) => setFormData({ ...formData, username: input.currentTarget.value })} className="form-control text-input" id="Username" name="Username"
                                placeholder="Enter username" required></input>
                    <h4 className='login-contents'>Password</h4>
                    <input type="password" value={formData.password} onInput={(input) => setFormData({ ...formData, password: input.currentTarget.value })} className="form-control text-input" id="Password" name="Password"
                                placeholder="Enter password" required></input>
                    {/*Submit Button*/}
                    <input className="btn btn-secondary login-contents login-button" type="submit" value="Login"></input>
                    <p className='login-contents'>(New users must register first to login into "The Gamer's Gaze") </p>
                </form>
                {/*Login Text*/}
                <div className='dotted-spacer'></div>
                {/*Line Divider*/}
                <div className='lined-spacer'></div>
            </div>
        </>
    )
}

export default Login