import React, { useState } from "react";

const Submission = ({ submissions }) => {
        return (
            <div className='submissionForm'>
                <div className='sloganContainer'>
                    <h1 className="gallerytitle"><span className="highlight">Top Rated Slogans</span></h1>
                        {/* <h2 className="ridersTitle"><span class="highlight">Slogan Competition</span></h2> */}
                </div>
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