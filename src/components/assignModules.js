import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase"; // Assuming you've imported your Firebase db and storage instances
import "../styles/AssignModules.scss";

const AssignModules = () => {
    const [title, setTitle] = useState("");
    const [video, setVideo] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState("English");
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        // Assuming only one file is uploaded, accessing the first file
        if (e.target.files[0]) {
            setVideo(e.target.files[0]);
        }
    };

    const handleSubjectChange = (e) => {
        setSelectedSubject(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Upload the video to Firebase Storage
            const storageRef = ref(storage, `videos/${video.name}`);
            const uploadTask = uploadBytesResumable(storageRef, video);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // You can track the progress here if needed
                },
                (error) => {
                    console.error("Error uploading video: ", error);
                },
                () => {
                    // Video uploaded successfully, now get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        async (downloadURL) => {
                            // Create a new document in the selected subject's 'documents' collection
                            const docRef = await addDoc(
                                collection(
                                    db,
                                    `subjects/${selectedSubject}/documents`
                                ),
                                {
                                    title: title,
                                    videoURL: downloadURL,
                                }
                            );
                            console.log(
                                "Document written with ID: ",
                                docRef.id
                            );

                            // Reset input fields after submission
                            setTitle("");
                            setVideo(null);
                            setSelectedSubject("English");
                            setLoading(false);
                        }
                    );
                }
            );
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return (
        <div className="moduleForm">
            <h2>Add Modules</h2>

            <div className="formContainer">
                <form onSubmit={handleSubmit} className="form">
                    <label className="formLabel">
                        Select Subject:
                        <select
                            value={selectedSubject}
                            onChange={handleSubjectChange}
                            className="selectSubject"
                        >
                            <option value="English">English</option>
                            <option value="Maths">Maths</option>
                            <option value="Science">Science</option>
                        </select>
                    </label>
                    <br />
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
                        Upload Video:
                        <input
                            type="file"
                            accept="video/*"
                            onChange={handleFileChange}
                            className="fileInput"
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

export default AssignModules;
