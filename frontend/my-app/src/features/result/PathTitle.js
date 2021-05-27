import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import styles from "./PathResult.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../../Authentication/LogoutButton";

const PathTitle = () => {
  const { user } = useAuth0();
  const slide = useSpring({
    from: { marginRight: -100 },
    to: { marginRight: 0 },
    config: { delay: 1000 },
  });
  return (
    <animated.div className={styles.resultTitle} style={slide}>
      <div className="user">
        <img src={user.picture} alt="User Image" />
        <div>{user.email}</div>
        <LogoutButton />
      </div>
      Path Result
    </animated.div>
  );
};
export default PathTitle;
