import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChartBar,
    faBook,
    faChalkboardTeacher,
    faGraduationCap,
    faUsers,
    faQuestionCircle,
    faClipboardList,
    faEnvelope,
    faTasks,
    faCog,
    faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Sidebar.scss";
import { Link } from "react-router-dom";

const options = [
    { icon: faChartBar, label: "Dashboard", path: "/" },

    { icon: faBook, label: "Library", path: "/library" },
    { icon: faChalkboardTeacher, label: "Classroom", path: "/classroom" },
    { icon: faGraduationCap, label: "Courses", path: "/courses" },
    { icon: faUsers, label: "Co-curricular", path: "/co-curricular" },
    { icon: faQuestionCircle, label: "Quizzes", path: "/quizzes" },
    { icon: faClipboardList, label: "Attendance", path: "/attendance" },
    { icon: faEnvelope, label: "Messages", path: "/messages" },
    { icon: faTasks, label: "Assignments", path: "/assignments" },
    { icon: faCog, label: "Group Discussion", path: "/groupDiscussion" },
    { icon: faSignOutAlt, label: "Log out", path: "/logout" },
];

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar__header">BlendEdHub</div>
            <div className="sidebar__menu">
                <ul>
                    {options.map((option, index) => (
                        <div className="optionContainer">
                            <li key={index}>
                                <Link to={option.path}>
                                    <div className="icon">
                                        <FontAwesomeIcon
                                            icon={option.icon}
                                            size="2x"
                                        />
                                    </div>
                                    <p className="option">{option.label}</p>
                                </Link>
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
