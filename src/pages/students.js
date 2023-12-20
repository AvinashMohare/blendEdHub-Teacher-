import React, { useState } from "react";
import onlineStudentsData from "../components/onlineStudentsData"; // Importing the data
import "../styles/students.scss";

const Students = () => {
    const [sortOrder, setSortOrder] = useState("asc"); // State to track sorting order

    const sortedStudents = onlineStudentsData.sort((a, b) => {
        // Sorting based on average score
        const averageScoreA = a.quizScore / 2 + a.alertScore / 2;
        const averageScoreB = b.quizScore / 2 + b.alertScore / 2;

        if (sortOrder === "asc") {
            return averageScoreA - averageScoreB;
        } else {
            return averageScoreB - averageScoreA;
        }
    });

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    return (
        <div className="rootStudents">
            <h2>Online Students</h2>
            <div className="container">
                <button className="buttonSort" onClick={toggleSortOrder}>
                    Toggle Sort
                </button>
                <table className="stu-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Attentiveness Score</th>
                            <th>Quiz Score</th>
                            <th>Average Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedStudents.map((student) => (
                            <tr
                                key={student.id}
                                className={
                                    student.quizScore / 2 +
                                        student.alertScore / 2 <
                                    40
                                        ? "red-row"
                                        : "green-row"
                                }
                            >
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.alertScore}</td>
                                <td>{student.quizScore}</td>
                                <td>
                                    {student.quizScore / 2 +
                                        student.alertScore / 2}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Students;
