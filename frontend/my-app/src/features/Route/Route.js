import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { putSpecificPath, selectUserEmail } from "./RouteSlice";
import { animated, Spring } from "react-spring";
import styles from "./Route.module.css";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const Route = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  const changeEmail = () => {
    if (firstName === "" || lastName === "") {
      alert("FirstName and LastName should not be empty!");
      return;
    }
    const revisedFirstName =
      firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    const revisedLastName =
      lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
    const url =
      "http://localhost:8081/route/" +
      revisedFirstName.trim() +
      " " +
      revisedLastName.trim();
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) =>
        dispatch(putSpecificPath({ path: res.data, search: true }))
      )
      .catch((err) => console.log("err:" + err));
  };
  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "dev-ycc1kc9h.us.auth0.com";

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });
        setToken(accessToken);
      } catch (e) {
        console.log(e.message);
      }
    };
    getUserMetadata();
  }, []);
  return (
    <Spring
      from={{ opacity: 0 }}
      to={{ opacity: 1 }}
      config={{ delay: 5000, duration: 5000 }}>
      {(prop) => (
        <animated.div style={prop}>
          <form>
            <label>FirstName:</label>
            <input
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              className={styles.inputBlock}></input>
            <label>LastName:</label>
            <input
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              className={styles.inputBlock}></input>
            {/* <label>Email:</label> */}
            {/* <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              className={styles.inputBlock}></input> */}
          </form>
          <button onClick={changeEmail} className={styles.button}>
            Submit
          </button>
        </animated.div>
      )}
    </Spring>
  );
};
export default Route;
