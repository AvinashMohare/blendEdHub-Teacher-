import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase"; // Assuming you've imported your Firebase db and storage instances

const AddDocument = () => {
    const [title, setTitle] = useState("");
    const [video, setVideo] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState("English");

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
                        }
                    );
                }
            );
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return (
        <div>
            <h2>Add Document</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Select Subject:
                    <select
                        value={selectedSubject}
                        onChange={handleSubjectChange}
                    >
                        <option value="English">English</option>
                        <option value="Maths">Maths</option>
                        <option value="Science">Science</option>
                    </select>
                </label>
                <br />
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Upload Video:
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddDocument;
