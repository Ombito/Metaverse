import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Error1 from '../../assets/error.jpg';
import './error.css';


const Error = () => {
    const navigate = useNavigate();

    const handleNavigate = (route) => {
        navigate(route);
      };

    return (
        <div className="error-container">
            <img className="error-image" src={Error1} alt="" />
            <div className="error-button">
                <button onClick={() => handleNavigate('/')}>Continue Shopping</button>
            </div>
        </div>
    )
}

export default Error;