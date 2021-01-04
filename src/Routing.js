import React from 'react';
import {Route, withRouter} from "react-router-dom";
import Home from "./pages/Home";
import Leaderboard from './pages/Leaderboard'
import Play from './pages/Play'
import Layout from './layout/Layout';

export const HomeRoute = "/";
export const PlayRoute = "/play/";
export const LeaderboardRoute = "/leaderboards/";

class Routing extends React.Component {
    render() {
        return (
            <Layout>
                <Route path={HomeRoute} exact component={Home}/>
                <Route path={PlayRoute} component={Play}/>
                <Route path={LeaderboardRoute} exact component={Leaderboard}/>
            </Layout>
        );
    }
}

export default withRouter(Routing);