import React, { useState } from "react";
import "../styles/StudentGroups.scss";
// Sample student data
const initialOnlineStudents = [
    { id: 1, name: "Avinash Mohare", score: 95 },
    { id: 2, name: "Himanshu Wadhwani", score: 92 },
    { id: 3, name: "Harsh Mure", score: 78 },
];

const initialOfflineStudents = [
    { id: 4, name: "Ashwin Dhule", score: 90 },
    { id: 5, name: "Sanika Peshkar", score: 88 },
    { id: 6, name: "Aditi Navnage", score: 80 },
];

const StudentGroups = () => {
    const [onlineStudents, setOnlineStudents] = useState(initialOnlineStudents);
    const [offlineStudents, setOfflineStudents] = useState(
        initialOfflineStudents
    );

    const handleDragStart = (event, student, source) => {
        event.dataTransfer.setData("studentId", student.id.toString());
        event.dataTransfer.setData("source", source);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event, target) => {
        event.preventDefault();
        const studentId = event.dataTransfer.getData("studentId");
        const source = event.dataTransfer.getData("source");

        const draggedStudent =
            source === "online"
                ? onlineStudents.find(
                      (student) => student.id.toString() === studentId
                  )
                : offlineStudents.find(
                      (student) => student.id.toString() === studentId
                  );

        if (draggedStudent) {
            if (source === "online") {
                const updatedOnlineStudents = onlineStudents.filter(
                    (student) => student.id.toString() !== studentId
                );
                setOnlineStudents(updatedOnlineStudents);
                setOfflineStudents([...offlineStudents, draggedStudent]);
            } else {
                const updatedOfflineStudents = offlineStudents.filter(
                    (student) => student.id.toString() !== studentId
                );
                setOfflineStudents(updatedOfflineStudents);
                setOnlineStudents([...onlineStudents, draggedStudent]);
            }
        }
    };

    return (
        <div className="container">
            <h1>Student Groups</h1>

            <div className="groupContainer">
                <div
                    className="block"
                    onDragOver={(event) => handleDragOver(event)}
                    onDrop={(event) => handleDrop(event, "online")}
                >
                    <h2>Online</h2>
                    {onlineStudents.map((student) => (
                        <div
                            key={student.id}
                            className="student"
                            draggable
                            onDragStart={(event) =>
                                handleDragStart(event, student, "online")
                            }
                        >
                            {student.name} - Score: {student.score}
                        </div>
                    ))}
                </div>
                <div
                    className="block"
                    onDragOver={(event) => handleDragOver(event)}
                    onDrop={(event) => handleDrop(event, "offline")}
                >
                    <h2>Offline</h2>
                    {offlineStudents.map((student) => (
                        <div
                            key={student.id}
                            className="student"
                            draggable
                            onDragStart={(event) =>
                                handleDragStart(event, student, "offline")
                            }
                        >
                            {student.name} - Score: {student.score}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentGroups;
