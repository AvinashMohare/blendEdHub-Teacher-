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

    // { icon: faBook, label: "Library", path: "/library" },
    {
        icon: faChalkboardTeacher,
        label: "Assign Modules",
        path: "/assignModules",
    },
    // { icon: faGraduationCap, label: "Courses", path: "/courses" },
    { icon: faUsers, label: "Students", path: "/students" },
    { icon: faQuestionCircle, label: "Quizzes", path: "/quizzes" },
    { icon: faClipboardList, label: "Attendance", path: "/attendance" },
    { icon: faEnvelope, label: "Messages", path: "/messages" },
    { icon: faTasks, label: "Recommend", path: "/recommend" },
    { icon: faCog, label: "Group Discussion", path: "/groupDiscussion" },
    { icon: faSignOutAlt, label: "Log out", path: "/logout" },
];

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="logo">
                    <img src="https://media.discordapp.net/attachments/1183758222847389791/1186894497049743400/cap.png?ex=6594e8a3&is=658273a3&hm=b102b70fd6626055f4d253bab1b24e22fe2b223d7ea1f0c59d216f23b5d61a5c&=&format=webp&quality=lossless&width=673&height=578"></img>
                    <h3>BlendEdHub</h3>
                </div>
            </div>
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
