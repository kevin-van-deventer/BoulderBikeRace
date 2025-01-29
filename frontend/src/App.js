import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

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
  const [riders, setRiders] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ridersData, submissionsData] = await Promise.all([get_riders(), get_submissions()]);
        setRiders(ridersData);
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
      const newSlogan = await create_slogan(newSloganData);
      setSubmissions((prevSubmissions) => [...prevSubmissions, newSlogan]);
    } catch (error) {
      console.error("Error creating slogan:", error);
      throw error;
    }
  };

  return (
    <Router>
      <div className="App">
        <NavBar />
        {/* <div className="main-content"> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/slogans" element={<SloganPage submissions={submissions} addSlogan={addSlogan}/>} />
          <Route path="/riders" element={<BikeRidersPage riders={riders} />} />
          <Route path="/photos" element={<PhotosPage />} />
          <Route path="/locations" element={<LocationsPage />} /> 
          </Routes>
          {/* </div> */}
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;