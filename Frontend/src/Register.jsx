import './Register.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    //Variables that signify the internal state of the Contact-Form is being updated.
        const [formData, setFormData] = useState({
            username: '',
            password: '',
            repeatPassword: ''
        });
        
        const [errors, setErrors] = useState({
            username: '',
            password: '',
            repeatPassword: ''
        });
        const [success, setSuccess] = useState('');
        
        const sendData = async (e) => {
            e.preventDefault();
            setErrors({ username: '', password: '', repeatPassword: '' });
            setSuccess('');
            try {
                const response = await fetch(import.meta.env.VITE_REGISTRY_LINK, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                const result = await response.json();
                
                if (!response.ok) {
                    // Categorize error messages by field
                    const errorMessage = result.message;
                    let newErrors = { username: '', password: '', repeatPassword: '' };
                    
                    if (errorMessage.includes('Username') || errorMessage.includes('username')) {
                        newErrors.username = errorMessage;
                    } else if (errorMessage.includes('All fields are required')) {
                        // Check which fields are empty
                        if (!formData.username) newErrors.username = 'Username is required';
                        if (!formData.password) newErrors.password = 'Password is required';
                        if (!formData.repeatPassword) newErrors.repeatPassword = 'Repeat password is required';
                    } else if (errorMessage.includes('match')) {
                        newErrors.repeatPassword = errorMessage;
                    } else {
                        // Password requirement errors
                        newErrors.password = errorMessage;
                    }
                    
                    setErrors(newErrors);
                } else {
                    setSuccess(result.message);
                    // Save username to localStorage
                    localStorage.setItem('username', formData.username);
                    setFormData({ username: '', password: '', repeatPassword: '' });
                    // Redirect to dashboard after successful registration
                    setTimeout(() => navigate('/dashboard'), 1500);
                }
                console.log('Response:', result);
            } catch (error) {
                console.error('Error:', error);
                setErrors({ ...errors, username: 'Error connecting to server' });
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
                    <form onSubmit={sendData} className='register-container'>
                        <h1>Register</h1>
                        {/*Username Section*/}
                        <div className='form-group'>
                            <div className='input-wrapper'>
                                <div className='input-column'>
                                    <h4 className='register-contents'>Username</h4>
                                    <input type="text" onInput={(input) => setFormData({ ...formData, username: input.currentTarget.value })} className="form-control text-input" id="Username" name="Username"
                                                placeholder="Enter username" required></input>
                                </div>
                                {errors.username && <p className='error-message'>{errors.username}</p>}
                            </div>
                        </div>
                        {/*Password Section*/}
                        <div className='form-group'>
                            <div className='input-wrapper'>
                                <div className='input-column'>
                                    <h4 className='register-contents'>Password</h4>
                                    <input type="password" onInput={(input) => setFormData({ ...formData, password: input.currentTarget.value })} className="form-control text-input" id="Password" name="Password"
                                                placeholder="Enter password" required></input>
                                </div>
                                {errors.password && <p className='error-message'>{errors.password}</p>}
                            </div>
                        </div>
                        {/*Repeated Password Section*/}
                        <div className='form-group'>
                            <div className='input-wrapper'>
                                <div className='input-column'>
                                    <h4 className='register-contents'>Repeat Password</h4>
                                    <input type="password" onInput={(input) => setFormData({ ...formData, repeatPassword: input.currentTarget.value })} className="form-control text-input" id="Repeat-Password" name="Repeat-Password"
                                                placeholder="Enter password again" required></input>
                                </div>
                                {errors.repeatPassword && <p className='error-message'>{errors.repeatPassword}</p>}
                            </div>
                        </div>

                        {/*Success output */}
                        {success && <p className='success-message'>{success}</p>}
                        {/*Submit Button*/}
                        <input className="btn btn-secondary register-contents register-button" type="submit" value="Register"></input>
                        <p className='register-contents'>(If you already have a registered account you can enter "The Gamer's Gaze" through the login screen) </p>
                        
                    </form>
                    {/*Login Text*/}
                    <div className='dotted-spacer'></div>
                    {/*Line Divider*/}
                    <div className='lined-spacer'></div>
                </div>
            </>
        )
}
export default Register