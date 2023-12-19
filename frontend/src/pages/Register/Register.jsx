import React, { useState } from "react";
import "./Register.css";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";
import { registerUser } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    nickname: "",
    password: "",
  });

  const [userError, setUserError] = useState({
    nameError: "",
    emailError: "",
    nicknameError: "",
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

  const Submit = () => {
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

    registerUser(user)
      .then((resultado) => {
        navigate("/login");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="registerDesign">
      <div className="header">Name</div>
      <CustomInput
        disabled={false}
        design={`inputDesign ${
          userError.nameError !== "" ? "inputDesignError" : ""
        }`}
        type={"text"}
        name={"name"}
        placeholder={""}
        value={""}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div
        className={`errorMsgVoid ${
          userError.nameError !== "" ? "errorMsg" : ""
        }`}
      >
        {userError.nameError}
      </div>
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
      <div className="header">Nick Name</div>
      <CustomInput
        disabled={false}
        design={`inputDesign ${
          userError.nicknameError !== "" ? "inputDesignError" : ""
        }`}
        type={"text"}
        name={"nickname"}
        placeholder={""}
        value={""}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div
        className={`errorMsgVoid ${
          userError.nicknameError !== "" ? "errorMsg" : ""
        }`}
      >
        {userError.nicknameError}
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
      <div className="buttonSubmit-green" onClick={Submit}>
        Submit
      </div>
    </div>
  );
};
