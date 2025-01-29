import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import AboutPage from "./pages/AboutPage";
// import ContactPage from "./pages/ContactPage";

import './App.css';


// Import components
import Slogan from './components/Slogan';
import RidersList from './components/ridersList';
// import SubmitSlogan from './components/addSlogan';

// Import API endpoints
import { get_riders, get_submissions, create_slogan } from './api/endpoints';  // Import create_slogan here

function App() {
  const [riders, setRiders] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState("");

  // Fetch riders and submissions on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ridersData, submissionsData] = await Promise.all([get_riders(), get_submissions()]);
        setRiders(ridersData);
        setSubmissions(submissionsData);
        console.log(ridersData, submissionsData);
      } catch (error) {
        setError("Error fetching data. Please try again.");
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Add a new slogan
  // const addSlogan = async ({ first_name, last_name, email, slogan }) => {
  //   try {
  //     const newSlogan = await create_slogan({ first_name, last_name, email, slogan });
  //     setSubmissions((prevSubmissions) => [...prevSubmissions, newSlogan]); // Safe state update
  //     console.log("Slogan created:", newSlogan);
  //   } catch (error) {
  //     setError("Error creating slogan. Please try again.");
  //     console.error("Error creating slogan:", error);
  //   }
  // };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Boulder Bike Tour</h1>
        <div className="app-container">
          {/* Add new slogan form submission */}
          {/* <SubmitSlogan addSlogan={addSlogan} /> */}

          {/* Display error message if there's any */}
          {error && <div className="error-message">{error}</div>}

          {/* List of submitted slogans */}
          <Slogan submissions={submissions} />

          {/* List of riders */}
          <RidersList riders={riders} />
        </div>
      </header>
    </div>
  );
}

export default App;
