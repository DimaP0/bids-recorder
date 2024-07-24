import "./App/modules.App.css";
import { useNavigate, Outlet } from "react-router-dom";
import MyMap from "./components/UI/MyMap/MyMap.jsx";
let navigate;

function App() {
    navigate = useNavigate();

    return (
        <>
            <nav>
                <header>
                    <div
                        className="headerItem"
                        onClick={() => {
                            if (document.getElementById("map")) document.getElementById("map").remove(); 
                            navigate("statement", { replace: false });
                        }}
                    >
                        Journal
                    </div>
                    <div
                        className="headerItem"
                        onClick={() => {
                            <MyMap />
                            navigate("map", { replace: false });
                        }}
                    >
                        Map
                    </div>
                </header>
            </nav>
            <Outlet />
        </>
    );
}
export default App;
export {navigate};
