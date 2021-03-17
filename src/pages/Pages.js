import React, {lazy, Suspense} from 'react';
import {Route, Switch} from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';

const Home = lazy(() => import('./Home'));
const Play = lazy(() => import('./Play'));
const Leaderboard = lazy(() => import('./Leaderboard'));
const Results = lazy(() => import( './Results'));
const HowTo = lazy(() => import( './HowTo'));
const Profile = lazy(() => import( './Profile'));
const SignIn = lazy(() => import( './SignIn'));
const About = lazy(() => import( './About'));
const Privacy = lazy(() => import( './Privacy'));
const TsAndCs = lazy(() => import( './TsAndCs'));
const Score = lazy(() => import( "./Score"));
const Fixtures = lazy(() => import( "./Fixtures"));

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
export const ScoreRoute = "/score/";
export const FixturesRoute = "/fixtures/";

export default function Pages() {
    return (
        <Suspense fallback={<div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 400}}><CircularProgress/></div>}>
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
            <Route path={ScoreRoute} exact component={Score}/>
            <Route path={FixturesRoute} exact component={Fixtures}/>
        </Switch>
        </Suspense>
    );
}
