import React from "react";
import RidersList from "../components/ridersList";

import '../pages/BikeRidersPage.css';

const BikeRidersPage = ({ riders }) => {
  return (
    <div className="app-container">
        {/* List of riders */}
        <RidersList riders={riders} />
    </div>
  );
};

export default BikeRidersPage;