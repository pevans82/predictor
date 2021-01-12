import React from 'react';
import {Route} from "react-router-dom";
import Home from "./pages/Home";
import Leaderboard from './pages/Leaderboard'
import Play from './pages/Play'

export const HomeRoute = "/";
export const PlayRoute = "/play/";
export const LeaderboardRoute = "/leaderboard/";

export default function Routing() {
    return (
        <div>
            <Route path={HomeRoute} exact component={Home}/>
            <Route path={PlayRoute} component={Play}/>
            <Route path={LeaderboardRoute} exact component={Leaderboard}/>
        </div>
    );
}
