import React from "react";
import { useSelector } from "react-redux";
import { selectSinglePath } from "./IndPathSlice";
import styles from "./PathResult.module.css";
import { useSpring, animated } from "react-spring";
import { useHistory } from "react-router-dom";

const IndPathResult = () => {
  const path = useSelector(selectSinglePath);
  const history = useHistory();
  const style = useSpring({
    loop: { reverse: true },
    to: { left: 500, opacity: 1 },
    from: { left: 300, opacity: 0 },
    config: { duration: 5000 },
  });
  const goBack = () => {
    history.push("/");
  };
  return (
    <div>
      <animated.div className={styles.singleResult} style={style}>
        {path}
      </animated.div>
      <button onClick={goBack} className={styles.button}>
        Back
      </button>
    </div>
  );
};
export default IndPathResult;
