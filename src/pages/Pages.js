import React from 'react';
import {Route, Switch} from "react-router-dom";
import Home from "./Home";
import Play from './Play'
import Leaderboard from './Leaderboard'
import Results from './Results'
import HowTo from './HowTo'
import Profile from './Profile'
import SignIn from './SignIn'
import About from './About'
import Privacy from './Privacy'
import TsAndCs from './TsAndCs'

export const HomeRoute = "/";
export const PlayRoute = "/play/";
export const LeaderboardRoute = "/leaderboard/";
export const ResultsRoute = "/results/";
export const HowToRoute = "/how-to/";
export const ProfileRoute = "/profile/";
export const SignInRoute = "/sign-in/";
export const AboutRoute = "/about/";
export const PrivacyRoute = "/privacy/";
export const TcAndCsRoute = "/terms-and-conditions/";

export default function Pages() {
    return (
        <Switch>
            <Route path={HomeRoute} exact component={Home}/>
            <Route path={PlayRoute} component={Play}/>
            <Route path={LeaderboardRoute} exact component={Leaderboard}/>
            <Route path={ResultsRoute} exact component={Results}/>
            <Route path={ProfileRoute} exact component={Profile}/>
            <Route path={HowToRoute} exact component={HowTo}/>
            <Route path={SignInRoute} exact component={SignIn}/>
            <Route path={AboutRoute} exact component={About}/>
            <Route path={PrivacyRoute} exact component={Privacy}/>
            <Route path={TcAndCsRoute} exact component={TsAndCs}/>
        </Switch>
    );
}
