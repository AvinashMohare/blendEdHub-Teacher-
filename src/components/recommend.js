import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import "../styles/AssignModules.scss";

const Recommendations = ({ db }) => {
    const [title, setTitle] = useState("");
    const [videoURL, setVideoURL] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const docRef = await addDoc(
                collection(db, "recommendations", "Avinash", "documents"),
                {
                    title: title,
                    videoURL: videoURL,
                }
            );
            console.log("Document written with ID: ", docRef.id);

            setTitle("");
            setVideoURL("");
            setLoading(false);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return (
        <div className="moduleForm">
            <h2>Add Recommendations</h2>

            <div className="formContainer">
                <form onSubmit={handleSubmit} className="form">
                    <label className="formLabel">
                        Title:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="inputField"
                        />
                    </label>
                    <br />
                    <label className="formLabel">
                        Video URL:
                        <input
                            type="text"
                            value={videoURL}
                            onChange={(e) => setVideoURL(e.target.value)}
                            className="inputField"
                        />
                    </label>
                    <br />
                    {loading && <div className="loader"></div>}
                    <button type="submit" className="submitButton">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Recommendations;
