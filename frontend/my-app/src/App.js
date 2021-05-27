import React, { useEffect } from "react";
import Title from "./Title";
import PathResult from "./features/result/PathResult";
import { useSelector } from "react-redux";
import { selectUserSearch } from "./features/Route/RouteSlice";
import { useAuth0 } from "@auth0/auth0-react";
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Redirect,
} from "react-router-dom";
import Path from "./features/Route/Route";
import IndPathResult from "./features/result/IndPathResult";
import LoginButton from "./Authentication/LoginButton";

import "./App.css";
function App() {
  const search = useSelector(selectUserSearch);
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <Router>
      <Route exact path="/">
        {isAuthenticated ? (
          <Redirect to="/search" />
        ) : (
          <div className="loginPart">
            <div className="loginTitle">Login Page</div>
            <LoginButton />
          </div>
        )}
      </Route>
      <Route path="/search">
        {isAuthenticated ? (
          <div>
            <div className="App">
              {!search ? (
                <div>
                  <Title></Title>
                  <Path></Path>
                </div>
              ) : (
                <PathResult></PathResult>
              )}
            </div>
          </div>
        ) : (
          <Redirect to="/" />
        )}
      </Route>
      <Route path="/path">
        {isAuthenticated ? (
          <div>
            <IndPathResult />
          </div>
        ) : (
          <Redirect to="/" />
        )}
      </Route>
    </Router>
  );
}

export default App;
