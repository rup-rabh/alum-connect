import React, { useState } from 'react';
import './Activities.css';
import NavBar from './NavBar';

const Activities = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  const upcomingEvents = [
    {
      title: "Career Workshop",
      description: "Master resume building and interview skills",
      date: "April 25, 2025",
      time: "10:00 AM - 12:00 PM",
      location: "Virtual Zoom Meeting",
      attendees: "58 students attending",
      timeAway: "3 days left"
    },
    {
      title: "Tech Symposium",
      description: "Explore latest trends in AI and blockchain",
      date: "May 2, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Innovation Center Hall",
      attendees: "92 students attending",
      timeAway: "1 week left"
    }
  ];

  const pastEvents = [
    {
      month: "March 2025",
      events: [
        {
          title: "Spring Career Fair",
          description: "Connect with top tech companies",
          date: "March 15, 2025",
          attendees: "250+ students attended",
          rating: "4.8/5 (125 reviews)"
        }
      ]
    },
    {
      month: "February 2025",
      events: [
        {
          title: "Startup Bootcamp",
          description: "Hands-on entrepreneurship training",
          date: "February 22, 2025",
          attendees: "85 students attended",
          rating: "4.6/5 (62 reviews)"
        }
      ]
    }
  ];


  return (
    <>
    <NavBar/>
    <div className="activities-container">
      <h1 className="activities-title">Activities</h1>
      <p className="activities-subtitle">Discover and participate in events organized</p>

      <div className="tabs-container">
        <button 
          className={`tab-button ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming Events
        </button>
        <button 
          className={`tab-button ${activeTab === 'past' ? 'active' : ''}`}
          onClick={() => setActiveTab('past')}
        >
          Past Events
        </button>
      </div>

      <div className="events-container">
        {activeTab === 'upcoming' ? (
          <div className="upcoming-events">
            {upcomingEvents.length === 0 ? (
              <div className="no-events-message">No upcoming events scheduled</div>
            ) : (
              upcomingEvents.map((event, index) => (
                <div className="event-card" key={`upcoming-${index}`}>
                  <div className="event-time-badge">{event.timeAway}</div>
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-description">{event.description}</p>
                  <div className="event-details">
                    <p>📅 {event.date}</p>
                    <p>⏰ {event.time}</p>
                    <p>📍 {event.location}</p>
                    <p>👥 {event.attendees}</p>
                  </div>
                  <button className="register-button">Register Now</button>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="past-events">
            {pastEvents.length === 0 ? (
              <div className="no-events-message">No past events available</div>
            ) : (
              pastEvents.map((monthGroup, index) => (
                <div key={`month-${index}`}>
                  <h3 className="past-events-month">{monthGroup.month}</h3>
                  {monthGroup.events.map((event, idx) => (
                    <div className="event-card" key={`past-${index}-${idx}`}>
                      <h4 className="past-event-title">{event.title}</h4>
                      <p className="past-event-description">{event.description}</p>
                      <div className="past-event-details">
                        <p>📅 {event.date}</p>
                        <p>👥 {event.attendees}</p>
                        <div className="rating-badge">⭐ {event.rating}</div>
                      </div>
                      <div className="past-event-actions">
                        <button className="view-button">View Gallery</button>
                        <button className="resources-button">Resources</button>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Activities;