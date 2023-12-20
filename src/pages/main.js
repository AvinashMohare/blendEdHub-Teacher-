import Sidebar from "../components/sidebar";
import "../styles/Main.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Dashboard from "./dashboard";
import AssignModules from "../components/assignModules";
import Students from "./students";
import Recommend from "../components/recommend";
import { db } from "../firebase";

const Main = () => {
    return (
        <Router>
            <div className="rootMain">
                <div className="sidebar">
                    <Sidebar />
                </div>
                <div className="center">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />

                        <Route
                            path="/assignModules"
                            element={<AssignModules />}
                        />
                        <Route path="/students" element={<Students />} />
                        <Route
                            path="/recommend"
                            element={<Recommend db={db} />}
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default Main;
