import React from "react";
import { useSpring, animated, Spring } from "react-spring";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./Authentication/LogoutButton";
const Title = () => {
  const { user } = useAuth0();
  return (
    <div>
      <Spring
        from={{ opacity: 0, marginTop: -500 }}
        to={{ opacity: 1, marginTop: 0 }}>
        {(props) => (
          <animated.div style={props} className="title">
            <div className="user">
              <img src={user.picture} alt="User Image" />
              <div>{user.email}</div>
              <LogoutButton />
            </div>
            Path Finder
          </animated.div>
        )}
      </Spring>
    </div>
  );
};
export default Title;
