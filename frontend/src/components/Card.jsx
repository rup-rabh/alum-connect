import React from 'react';
import './Card.css'; 
import { useNavigate } from 'react-router-dom';

const Card = ({ title, description, icon, link }) => {
    const navigate=useNavigate();

    const handleClick=()=>{
        navigate(link)
    }
    return (
        <div className="card" style={{cursor:'pointer'}} onClick={handleClick}>
            <div className="icon">
                {icon}
            </div>
            <h2 className="card-title">{title}</h2>
            <p className="card-description">{description}</p>
        </div>
    );
};

export default Card;