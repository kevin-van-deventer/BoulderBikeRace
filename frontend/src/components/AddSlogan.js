import React, { useState } from "react";
import { GiTargetPrize } from "react-icons/gi";
import { create_slogan } from "./api/endpoints";

const AddSlogan = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [slogan, setSlogan] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset error messages
        setSuccess(false);

        // Validation
        if (!firstName || !lastName || !email || !slogan) {
            setError("All fields are required.");
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (slogan.length > 50) {
            setError("Slogan must be under 50 characters.");
            return;
        }

        try {
            // Call create_slogan API function to add a new slogan
            const newSlogan = await create_slogan({ first_name: firstName, last_name: lastName, email:email, slogan:slogan });
            setFirstName("");
            setLastName("");
            setEmail("");
            setSlogan("");
            setSuccess(true);
            console.log("Slogan created:", newSlogan);
        } catch (err) {
            setError("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="submissionForm">
            <h2 className="ridersTitle">Slogan Competition</h2>
            <div className="sloganContainer">
                <GiTargetPrize color="white" size="30px" />
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="sloganInput"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="sloganInput"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="sloganInput"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="slogan">Slogan Idea</label>
                        <input
                            type="text"
                            id="slogan"
                            name="slogan"
                            value={slogan}
                            onChange={(e) => setSlogan(e.target.value)}
                            className="sloganInput"
                            required
                        />
                    </div>

                    {/* Display Error */}
                    {error && <div className="error">{error}</div>}

                    {/* Display Success Message */}
                    {success && <div className="success">Slogan submitted successfully!</div>}

                    {/* Submit Button */}
                    <button type="submit" className="submitBtn">Submit</button>
                </form>
                <GiTargetPrize color="white" size="30px" />
            </div>
        </div>
    );
};

export default AddSlogan;
