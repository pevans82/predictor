import React from 'react';
import {Route} from "react-router-dom";
import Home from "./pages/Home";
import Play from './pages/Play'
import Leaderboard from './pages/Leaderboard'
import Results from './pages/Results'
import HowTo from './pages/HowTo'
import Profile from './pages/Profile'

export const HomeRoute = "/";
export const PlayRoute = "/play/";
export const LeaderboardRoute = "/leaderboard/";
export const ResultsRoute = "/results/";
export const HowToRoute = "/how-to/";
export const ProfileRoute = "/profile/";

export default function Routing() {
    return (
        <div>
            <Route path={HomeRoute} exact component={Home}/>
            <Route path={PlayRoute} component={Play}/>
            <Route path={LeaderboardRoute} exact component={Leaderboard}/>
            <Route path={ResultsRoute} exact component={Results}/>
            <Route path={HowToRoute} exact component={HowTo}/>
            <Route path={ProfileRoute} exact component={Profile}/>
        </div>
    );
}
