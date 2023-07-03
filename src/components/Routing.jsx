import App from "../App";
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Reglas from "../Reglas";
import AboutUs from '../pages/AboutUs/AboutUs';
import LeaderBoards from "../pages/LeaderBoards/LeaderBoards";
import Login from "../profile/Login";
import Signup from "../profile/Signup";
import AdminCheck from "../protected/AdminCheck";
import UserCheck from "../protected/UserCheck";
import Board from "./Boards"
function Routing() {
    return(
        <>
        <BrowserRouter>
            <Routes>

                <Route path={"/"} element={<App/>} />
                <Route path={"/iniciar_sesion"} element={<Login/>} />
                <Route path={'/about_us'} element={< AboutUs/>} />
                <Route path={'/leaderboards'}  element = {<LeaderBoards/>} />
                <Route path={"/reglas"} element={<Reglas/>} />
                <Route path={"/signup"} element={<Signup />}/>
                <Route path={"/admincheck"} element={<AdminCheck />}/>
                <Route path={"/usercheck"} element={<UserCheck />}/>
                <Route path={"/board"} element={<Board />}/>
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default Routing;