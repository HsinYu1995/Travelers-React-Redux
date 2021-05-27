import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserPath } from "../Route/RouteSlice";
import { useTrail, animated } from "react-spring";
import styles from "./PathResult.module.css";
import PathTitle from "./PathTitle";
import { useHistory } from "react-router-dom";
import { goToSinglePath } from "./IndPathSlice";
const PathResult = () => {
  const path = useSelector(selectUserPath);
  const pathArr = path.split(";");
  const dispatch = useDispatch();
  const trail = useTrail(pathArr.length, {
    from: { opacity: 0, color: "white" },
    to: { opacity: 1, color: "black" },
    config: { delay: 2000 },
  });
  const history = useHistory();
  const nav = (id) => {
    dispatch(goToSinglePath(pathArr[id]));
    history.push("/path");
  };
  return (
    <div>
      <PathTitle />
      {trail.map((props, id) => (
        <animated.div
          className={styles.block}
          key={id}
          style={props}
          onClick={() => nav(id)}>
          {id + 1} : {pathArr[id]}
        </animated.div>
      ))}
    </div>
  );
};
export default PathResult;
