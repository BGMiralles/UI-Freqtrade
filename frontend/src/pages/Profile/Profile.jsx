import React, { useState, useEffect } from "react";
import "./Profile.css";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { updateProfile } from "../../services/apiCalls";

export const Profile = () => {
  const navigate = useNavigate();
  const datosRdxUser = useSelector(userData);

  const [profile, setProfile] = useState({
    name: datosRdxUser.data.name,
    nickname: datosRdxUser.data.nickname,
    email: datosRdxUser.data.email,
  });

  const [profileError, setProfileError] = useState({
    nameError: "",
    nicknameError: "",
    emailError: "",
  });

  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    if (!datosRdxUser.credentials) {
      navigate("/");
    }
  }, [datosRdxUser]);

  const errorCheck = (e) => {
    let error = "";

    error = validator(e.target.name, e.target.value);

    setProfileError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  const functionHandler = (e) => {
    setProfile((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  
  const sendData = () => {
    updateProfile(profile, datosRdxUser.credentials)
      .then((resultado) => {
        setIsEnabled(true);

        console.log(profile);
        console.log(datosRdxUser.credentials);
        console.log(datosRdxUser.data);
        console.log(resultado);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="profileDesign">
      <div className="header">Name</div>
      <CustomInput
        disabled={isEnabled}
        design={`inputDesign ${
          profileError.nameError !== "" ? "inputDesignError" : ""
        }`}
        type={"text"}
        name={"name"}
        placeholder={""}
        value={profile.name}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className="header">Nick Name</div>
      <CustomInput
        disabled={isEnabled}
        design={`inputDesign ${
          profileError.nicknameError !== "" ? "inputDesignError" : ""
        }`}
        type={"text"}
        name={"nickname"}
        placeholder={""}
        value={profile.nickname}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className="header">Email</div>
      <CustomInput
        disabled={isEnabled}
        design={`inputDesign ${
          profileError.emailError !== "" ? "inputDesignError" : ""
        }`}
        type={"text"}
        name={"email"}
        placeholder={""}
        value={profile.email}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      {isEnabled ? (
        <div className="editDesign" onClick={() => setIsEnabled(!isEnabled)}>
          Edit
        </div>
      ) : (
        <div className="sendDesign" onClick={() => sendData()}>
          Send
        </div>
      )}
    </div>
  );
};
