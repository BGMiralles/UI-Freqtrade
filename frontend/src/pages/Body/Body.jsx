import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { Profile } from '../Profile/Profile';
import { AboutView } from "../About/About";
import { Strategy } from '../Strategy/Strategy';
import { ViewNewStrategy } from '../ViewNewStrategy/ViewNewStrategy';
import { ViewSuperStrategy } from '../ViewSuperStrategies/ViewSuperStrategies';
import { TimeFrame } from '../TimeFrame/TimeFrame';
import { ViewSuperTechnicals } from '../ViewSuperTechnicals/ViewSuperTechnicals';
import { ViewSuperUsers } from '../ViewSuperUsers/ViewSuperUsers';
import { Technicals } from '../Technicals/Technicals';


export const Body = () => {
     return (
         <>
            <Routes>
                <Route path={'*'} element={<Navigate to="/" />}/>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/about" element={<AboutView />}/>
                <Route path="/strategies" element={<Strategy />}/>
                <Route path="/superstrategies" element={<ViewSuperStrategy />}/>
                <Route path="/newstrategy" element={<ViewNewStrategy />}/>
                <Route path="/timeframes" element={<TimeFrame />}/>
                <Route path="/technicals" element={<ViewSuperTechnicals />}/>
                <Route path="/users" element={<ViewSuperUsers />}/>
                <Route path="/usertechnicals" element={<Technicals />}/>
            </Routes>
         </>
     )
}