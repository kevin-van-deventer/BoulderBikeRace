import React from "react";

import '../pages/Slogan.css';

import Slogan from "../components/Slogan"; 
import AddSlogan from "../components/addSlogan";

const SloganPage = ({ submissions, addSlogan }) => {
  return (
    <div className="slogan-container" >
      {/* create new slogans */}
      <AddSlogan addSlogan={addSlogan} />
      <div className="riders-section">
      {/* List of submitted slogans */}
        <Slogan submissions={submissions} />
        </div>
    </div>
  );
};

export default SloganPage;