import React, { useState } from "react";

const Submission = ({ submissions, error }) => {
        return (
            <div className='submissionForm'>
                <div className='sloganContainer'>
                    <h1 className="pageTitle">Top Rated Slogans</h1>
                </div>

                {/* Display error message if exists */}
                {error && <p className="error-message">{error}</p>}

                <div className="ridersGrid">
                    {submissions.map((submission) => (
                        <div key={submission.id} className="riderCard">
                            <p className="riderName">
                                {submission.first_name} {submission.last_name}
                            </p>
                            <p className="riderCity">{submission.slogan}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
}

export default Submission;