import './Home.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

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
                {/*Introductory Text*/}
                <div className="introduction-container" >
                    <div className="text-start">
                        {/*Heading Text*/}
                        <h1>The Gamer's Gaze</h1>
                    </div>
                </div>
                {/*Introductory Text*/}
                <div className="secondary-container">
                    <div className="text-start">
                        {/*Heading Text*/}
                        <h2>A space to gaze upon your greatest games</h2>
                    </div>
                </div>
                {/*Line Divider*/}
                <div className='dotted-spacer'></div>
                {/*Line Divider*/}
                <div className='lined-spacer'></div>
                {/*Line Divider*/}
                <div className='dotted-spacer'></div>
                {/*Login and Register Title*/}
                <h1 className='login-header'>Login and Registration</h1>
                {/*Line Divider*/}
                <div className='dotted-spacer'></div>

                {/*Login and Register Buttons*/}
                <div className="button-container">
                    <button className="btn btn-secondary" onClick={() => navigate('/login')}>Login?</button>
                    <button className="btn btn-secondary" onClick={() => navigate('/registration')}>Register?</button>
                </div>
                {/*Line Divider*/}
                <div className='dotted-spacer'></div>
                {/*Line Divider*/}
                <div className='lined-spacer'></div>
                {/*Line Divider*/}
                <div className='dotted-spacer'></div>
                <h1 className='about-header'>About Us</h1>
                {/*Line Divider*/}
                <div className='dotted-spacer'></div>
                <div className='about-container'>
                    <p>The Gamer's Gaze was founded to provide gamers with a looking glass 
                        into what gamers say about the moost recent hit games. We are an organization
                        that prioritizes the freedom of information and user entertainment so that all 
                        gamers will one day surely prosper.
                    </p>
                </div>
                {/*Line Divider*/}
                <div className='dotted-spacer'></div>
                {/*Line Divider*/}
                <div className='lined-spacer'></div>
            </div>
        </>
    )
}

export default Home