import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Axios from "axios";

import { useDispatch } from "react-redux";
import { SET_ROLE_SESSION, SET_USER_DATA } from "../../constants/store";

import { ApiUserSet, ApiUserIdGet } from "../../constants/api";
import { roleAuth, roleNoAuth } from "../../setting/routes";
const Authorization = ({ children }) => {
  const { user, isAuthenticated } = useAuth0();
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const setUser = async () => {
    // авторизация через аутх

    const token = await getAccessTokenSilently();
    let config = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    };

    const params = new URLSearchParams({
      sub: user.sub,
      name: user.name,
      nickname: user.nickname,
      picture: user.picture,
    }).toString();
    const response = await Axios.post(`${ApiUserSet}?${params}`, null, config)
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        return false;
      });

    if (response) {
      localStorage.setItem("token", token);
      localStorage.setItem("id", user.sub);
      dispatch({
        type: SET_ROLE_SESSION,
        roleActive: roleAuth.role,
      });
      dispatch({
        type: SET_USER_DATA,
        user: response,
      });
    }
    if (response === false) {
      dispatch({
        type: SET_USER_DATA,
        user: false,
      });
    }
  };

  useEffect(() => {
    // авторизация через аутх
    if (isAuthenticated) {
      setUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // продление сессии
  const localtoken = localStorage.getItem("token");
  const localId = localStorage.getItem("id");

  if (localtoken) {
    dispatch({
      type: SET_ROLE_SESSION,
      roleActive: roleAuth.role,
    });
  } else {
    dispatch({
      type: SET_ROLE_SESSION,
      roleActive: roleNoAuth.role,
    });
  }

  const SessionAdd = async () => {
    let config = {
      headers: {
        Authorization: "Bearer " + localtoken,
      },
    };
    const response = await Axios.post(
      `${ApiUserIdGet}?id=${localId}`,
      "",
      config
    )
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        return false;
      });
    if (response) {
      dispatch({
        type: SET_ROLE_SESSION,
        roleActive: roleAuth.role,
      });
    }
    if (response) {
      dispatch({
        type: SET_USER_DATA,
        user: response,
      });
    }

    if (response === false) {
      dispatch({
        type: SET_USER_DATA,
        user: false,
      });
    }
  };

  useEffect(() => {
    if (localtoken) {
      SessionAdd();
    }
  }, [localtoken]);
  return <>{children}</>;
};

export default Authorization;
