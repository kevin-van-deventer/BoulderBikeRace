import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"; // enable client-side page navigation
// Enables smooth navigation without page reloads

// Import pages
import HomePage from "./pages/HomePage";
import SloganPage from "./pages/SloganPage";
import BikeRidersPage from "./pages/BikeRidersPage";
import PhotosPage from "./pages/PhotosPage";
import LocationsPage from './pages/LocationsPage';

// Import components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

// Import Style Sheet for main body html -> App
import './App.css';

// Import API endpoints
import { get_riders, get_submissions, create_slogan } from './api/endpoints';

function App() {
  const [riders, setRiders] = useState([]); // Stores bike rider data fetched from the API
  const [submissions, setSubmissions] = useState([]); // Stores slogan submissions fetched from the API
  const [error, setError] = useState(""); // Stores error message


  useEffect(() => { // runs once when app loads
    const fetchData = async () => {
      try {
        const [ridersData, submissionsData] = await Promise.all([get_riders(), get_submissions()]); // promise.all fetch riders and submissions in parallel
        setRiders(ridersData); // stores fetched data in state
        setSubmissions(submissionsData);
      } catch (error) {
        setError("Error fetching data. Please try again.");
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const addSlogan = async (newSloganData) => {
    try {
      const newSlogan = await create_slogan(newSloganData); // calls create function and sends to api
      setSubmissions((prevSubmissions) => [...prevSubmissions, newSlogan]); // updates submission state without reloading the page
    } catch (error) {
      console.error("Error creating slogan:", error);
      throw error;
    }
  };

  return (
    <Router>
      <div className="App">
        <NavBar />  {/* global components */}
        <Routes> {/* wraps routes in router */}
          <Route path="/" element={<HomePage />} />
          <Route path="/slogans" element={<SloganPage submissions={submissions} addSlogan={addSlogan}/>} /> {/*pass props to route/page */}
          <Route path="/riders" element={<BikeRidersPage riders={riders} />} />
          <Route path="/photos" element={<PhotosPage />} />
          <Route path="/locations" element={<LocationsPage />} /> 
          </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;