import React from "react";

const RidersList = ({riders}) => {

    return (
        <div className="ridersContainer">
            <h2 className="pageTitle">Competitors</h2>
            {/* <h1 className="title">Boulder Bike Tour</h1> */}
            <div className="ridersGrid">
                {riders.map((rider) => (
                <div key={rider.id} className="riderCard">
                    <p className="riderName">
                    {rider.first_name} {rider.last_name}
                    </p>
                    <p className="riderCity">{rider.city}</p>
                </div>
                ))}
            </div>
        </div>
    )
}

export default RidersList;