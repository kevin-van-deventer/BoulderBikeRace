import React from "react";

import '../pages/Home.css';

import CountdownTimer from "../components/CountdownTimer";

import raceVideo from '../assets/race.mp4';
import map from '../assets/map.jpg';

const HomePage = () => {
    return(
        <div className="home" >
            <div className="home-container">
                <video className="background-video" autoPlay loop muted>
                    <source src={raceVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <header className="App-header">
                <h1 className="title">
                    Boulder <br />
                    Bike Tour
                </h1>
                    {/* <img src={boulderLogo} alt="Boulder Bike Tour Logo" className="logo" /> */}
                </header>
                {/* {error && <div className="error-message">{error}</div>} */}
                <div className="countdown-container">
                    <CountdownTimer targetDate={new Date("2025-04-01T00:00:00")} />
                </div>
            </div>

            <div className="new-section">
                <div className="new-section-row">
                    <div className="new-section-left">
                    <img 
                        src={map} 
                        alt="Map" 
                        className="map-image"
                    />
                    </div>

                    <div className="new-section-right">
                    <div className="card">
                        <h3 className="card-title"><span className="highlight">Contestants</span></h3>
                        <p className="card-paragraph">
                            Join the bike race to stand a chance to win big this year.
                        </p>
                    </div>
                    <div className="card">
                        <h3 className="card-title"><span className="highlight">Slogan Contest</span></h3>
                        <p className="card-paragraph">
                            Cycle into the slogan competition and win a new Scott 25A Bicycle.
                        </p>
                    </div>
                    <div className="card">
                        <h3 className="card-title"><span className="highlight">Gallery</span></h3>
                        <p className="card-paragraph">
                            Visit our gallery page to experience previous years races and see what youre missing out on.
                        </p>
                    </div>
                </div>
            </div>
            </div>
                
            <div className="new-section2">
                <div className="new-section-content">
                    <h2 className="new-section-header">Ride Boulder at its Best</h2>
                    <p className="new-section-paragraph2">
                        Pedal alongside your fellow riders and experience the thrill of cycling at the foot of the majestic <span className="highlight">Rocky Mountains</span>. 
                        Renowned for its breathtaking landscapes and high-altitude challenge, the Boulder Bike Tour 
                        offers an unparalleled backdrop for this <span className="highlight">prestigious event</span>. As you conquer the scenic roads of <span className="highlight">Colorado</span>, 
                        you'll be immersed in the stunning natural beauty, from rolling hills to panoramic mountain views. 
                        Join us for the Boulder Bike Tour and be part of a <span className="highlight">decade-long</span> tradition of endurance, 
                        excitement, and inspiration!
                    </p>
                    <div className="new-section-cards">
                        <div className="card">
                            <h3>Road Races</h3>
                            <p>97 / 35km<br />April 1, 2025</p>
                            <button>More Info</button>
                        </div>
                        <div className="card">
                            <h3>Mountain Bike Races</h3>
                            <p>10 / 25 / 50km<br />April 1, 2025</p>
                            <button>More Info</button>
                        </div>
                        <div className="card">
                            <h3>Kids Races</h3>
                            <p>1 / 1.5 / 3 / 5.5km<br />April 1, 2025</p>
                            <button>More Info</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="new-section3">
                <div className="new-section-content">
                    <h2 className="new-section-header">Register Today - <span className="highlight">10% Discount</span></h2>
                    <p className="new-section-paragraph3">
                        Registartions are now <span className="highlight">Open </span> 
                        until <span className="highlight">1 April</span> or register at the Event.
                    </p>
                    <button className="regButton"
                        onClick={() => {
                            const mailtoLink = "mailto:boulderrace@gmail.com?subject=Race Registration&body=Hello, I would like to register for the Boulder Bike Tour. (First Name) and (Last Name) and your (City)";
                            window.open(mailtoLink, "_blank");
                        }}
                    >
                        Register Via Email
                    </button>
                </div>
            </div>
        </div>
        );
    };
    
export default HomePage;