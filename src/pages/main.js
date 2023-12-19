import Sidebar from "../components/sidebar";
import "../styles/Main.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from "react-router-dom"; // For newer versions of react-router-dom

const Main = () => {
    return (
        <Router>
            <div className="rootMain">
                <div className="sidebar">
                    <Sidebar />
                </div>
                <div className="center">
                    <Routes></Routes>
                </div>
            </div>
        </Router>
    );
};

export default Main;
