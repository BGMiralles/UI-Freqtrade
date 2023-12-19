import React, { useState, useEffect } from "react";
import "./Workers.css";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";
import { logArtist } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { login } from "../userSlice";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

export const LoginArtist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    tattoo_artist: "",
    password: "",
  });

  const [userError, setUserError] = useState({
    tattoo_artistError: "",
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

    logArtist(user)
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
      <div className="header">Tattoo Artist</div>
      <CustomInput
        disabled={false}
        design={`inputDesign ${
          userError.tattoo_artistError !== "" ? "inputDesignError" : ""
        }`}
        type={"text"}
        name={"tattoo_artist"}
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
      <div className="buttonSubmit" onClick={LogMe}>
        Login
      </div>
    </div>
  );
};
