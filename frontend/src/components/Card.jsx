import React from 'react';
import './Card.css'; 

const Card = ({ title, description, icon }) => {
    return (
        <div className="card">
            <div className="icon">
                {icon}
            </div>
            <h2 className="card-title">{title}</h2>
            <p className="card-description">{description}</p>
        </div>
    );
};

export default Card;