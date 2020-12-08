webpackHotUpdate("main",{

/***/ "./src/app/session/auth.js":
/*!*********************************!*\
  !*** ./src/app/session/auth.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _auth0_auth0_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @auth0/auth0-react */ "./node_modules/@auth0/auth0-react/dist/auth0-react.esm.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _constants_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../constants/store */ "./src/constants/store.js");
/* harmony import */ var _constants_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../constants/api */ "./src/constants/api.js");
/* harmony import */ var _setting_routes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../setting/routes */ "./src/setting/routes.js");








const Authorization = ({
  children
}) => {
  const {
    user,
    isAuthenticated
  } = Object(_auth0_auth0_react__WEBPACK_IMPORTED_MODULE_1__["useAuth0"])();
  const {
    getAccessTokenSilently
  } = Object(_auth0_auth0_react__WEBPACK_IMPORTED_MODULE_1__["useAuth0"])();
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useDispatch"])();

  const setUser = async () => {
    // авторизация через аутх
    const token = await getAccessTokenSilently();
    let config = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data"
      }
    };
    const params = new URLSearchParams({
      sub: user.sub,
      name: user.name,
      nickname: user.nickname,
      picture: user.picture
    }).toString();
    const response = await axios__WEBPACK_IMPORTED_MODULE_2___default.a.post(`${_constants_api__WEBPACK_IMPORTED_MODULE_5__["ApiUserSet"]}?${params}`, null, config).then(res => {
      return res.data;
    }).catch(e => {
      return false;
    });

    if (response) {
      localStorage.setItem("token", token);
      localStorage.setItem("id", user.sub);
      dispatch({
        type: _constants_store__WEBPACK_IMPORTED_MODULE_4__["SET_ROLE_SESSION"],
        roleActive: _setting_routes__WEBPACK_IMPORTED_MODULE_6__["roleAuth"].role
      });
      dispatch({
        type: _constants_store__WEBPACK_IMPORTED_MODULE_4__["SET_USER_DATA"],
        user: response
      });
    }

    if (response === false) {
      dispatch({
        type: _constants_store__WEBPACK_IMPORTED_MODULE_4__["SET_USER_DATA"],
        user: false
      });
    }
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    // авторизация через аутх
    if (isAuthenticated) {
      setUser();
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [isAuthenticated]); // продление сессии

  const localtoken = localStorage.getItem("token");
  const localId = localStorage.getItem("id");

  if (localtoken) {
    dispatch({
      type: _constants_store__WEBPACK_IMPORTED_MODULE_4__["SET_ROLE_SESSION"],
      roleActive: _setting_routes__WEBPACK_IMPORTED_MODULE_6__["roleAuth"].role
    });
  } else {
    dispatch({
      type: _constants_store__WEBPACK_IMPORTED_MODULE_4__["SET_ROLE_SESSION"],
      roleActive: _setting_routes__WEBPACK_IMPORTED_MODULE_6__["roleNoAuth"].role
    });
  }

  const SessionAdd = async () => {
    let config = {
      headers: {
        Authorization: "Bearer " + localtoken
      }
    };
    const response = await axios__WEBPACK_IMPORTED_MODULE_2___default.a.post(`${_constants_api__WEBPACK_IMPORTED_MODULE_5__["ApiUserIdGet"]}?id=${localId}`, "", config).then(res => {
      return res.data;
    }).catch(e => {
      return false;
    });

    if (response) {
      dispatch({
        type: _constants_store__WEBPACK_IMPORTED_MODULE_4__["SET_ROLE_SESSION"],
        roleActive: _setting_routes__WEBPACK_IMPORTED_MODULE_6__["roleAuth"].role
      });
    }

    if (response) {
      dispatch({
        type: _constants_store__WEBPACK_IMPORTED_MODULE_4__["SET_USER_DATA"],
        user: response
      });
    }

    if (response === false) {
      dispatch({
        type: _constants_store__WEBPACK_IMPORTED_MODULE_4__["SET_USER_DATA"],
        user: false
      });
    }
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (localtoken) {
      SessionAdd();
    }
  }, [localtoken]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, children);
};

/* harmony default export */ __webpack_exports__["default"] = (Authorization);

/***/ })

})
//# sourceMappingURL=main.89b262253856fc0d6147.hot-update.js.map