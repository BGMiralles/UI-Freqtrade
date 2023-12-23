import React, { useState, useEffect } from "react";
import "./Login.css";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";
import { logUser } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { login } from "../userSlice";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [userError, setUserError] = useState({
    emailError: "",
    passwordError: "",
  });

  const functionHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const errorCheck = (e) => {
    let error = "";

    error = validator(e.target.name, e.target.value);

    setUserError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  const LogMe = () => {
    for (let test1 in user) {
      if (user[test1] === "") {
        return;
      }
    }

    for (let test in userError) {
      if (userError[test] !== "") {
        return;
      }
    }

    logUser(user)
      .then((resultado) => {
        const tokenDecoded = jwtDecode(resultado);
        dispatch(login({ credentials: resultado, data: tokenDecoded }));
        console.log(resultado, tokenDecoded);
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="loginDesign">
      <div className="header">Email</div>
      <CustomInput
        disabled={false}
        design={`inputDesign ${
          userError.emailError !== "" ? "inputDesignError" : ""
        }`}
        type={"email"}
        name={"email"}
        placeholder={""}
        value={""}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div
        className={`errorMsgVoid ${
          userError.emailError !== "" ? "errorMsg" : ""
        }`}
      >
        {userError.emailError}
      </div>
      <div className="header">Password</div>
      <CustomInput
        disabled={false}
        design={`inputDesign ${
          userError.passwordError !== "" ? "inputDesignError" : ""
        }`}
        type={"password"}
        name={"password"}
        placeholder={""}
        value={""}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div
        className={`errorMsgVoid ${
          userError.passwordError !== "" ? "errorMsg" : ""
        }`}
      >
        {userError.passwordError}
      </div>
      <div className="buttonSubmit-green" onClick={LogMe}>
        Login
      </div>
    </div>
  );
};
