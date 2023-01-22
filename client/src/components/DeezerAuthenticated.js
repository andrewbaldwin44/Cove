import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { AuthenticationContext } from "./AuthenticationContext";

import { postRequestHeaders } from "../utils/authenticationUtils";
import { isContainingData } from "../utils/index";
import { request } from "../utils/api";

function DeezerAuthenticated() {
  const { userData } = useContext(AuthenticationContext);

  const [status, setStatus] = useState("loading");

  const location = useLocation();
  const code = new URLSearchParams(location.search).get("code");

  useEffect(() => {
    if (isContainingData(userData)) {
      const { userID } = userData;
      const newUserData = { userID: userID, deezerID: code };

      request("/api/register_deezer_id", {
        ...postRequestHeaders,
        body: JSON.stringify(newUserData),
      })
        .then((response) => response.json())
        .then(({ deezerID }) => {
          setStatus("idle");
        })
        .catch(() => setStatus("error"));
    }
  }, [userData, code]);

  if (status === "loading") {
    return <div>Loading...</div>;
  } else if (status === "idle" && code) {
    return <div>Login Successful! You may now return to your room</div>;
  } else {
    return <div>Deezer authentication was unsuccesful</div>;
  }
}

export default DeezerAuthenticated;
