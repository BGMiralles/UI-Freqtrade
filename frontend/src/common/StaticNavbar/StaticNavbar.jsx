import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./StaticNavbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, userData } from "../../pages/userSlice";
import { useNavigate } from "react-router-dom";

export const StaticNavbar = () => {
  const dispatch = useDispatch();
  const rdxCredentials = useSelector(userData);
  const navigate = useNavigate();

  const logOutMe = () => {
    dispatch(logout({ credentials: "" }));
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="bg-dark navbarStatic fixed-top">
      <Container className="container-navbar">
        <Navbar.Brand>
          <img className="headerLogo" src={"../src/img/logo.png"} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Brand className="text-white text-navbar-title" href="/">
          ROCKET <span className="blueColour">TATTOO</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto navbar-links">
            <Nav.Link className="text-navbar items-navbar" href="/">
              HOME
            </Nav.Link>
            <Nav.Link className="text-navbar items-navbar" href="/gallery">
              GALLERY
            </Nav.Link>
            <Nav.Link className="text-navbar items-navbar" href="/artists">
              ARTISTS
            </Nav.Link>
            <Nav.Link className="text-navbar items-navbar" href="/about">
              ABOUT US
            </Nav.Link>
            {rdxCredentials?.credentials ? (
              rdxCredentials.data.role === "2" || "super_admin" ? (
                <>
                  <Nav.Link
                    className="text-navbar items-navbar"
                    href="/superadmin"
                  >
                    SUPER ADMIN
                  </Nav.Link>
                  <Nav.Link
                    className="text-navbar items-navbar"
                    href="/myappointments"
                  >
                    {rdxCredentials.data.name}
                  </Nav.Link>
                  <div onClick={logOutMe}>
                    <Nav.Link className="text-navbar items-navbar" href="/">
                      LOG OUT
                    </Nav.Link>
                  </div>
                </>
              ) : (
                <>
                  <Nav.Link
                    className="text-navbar items-navbar"
                    href="/appointments"
                  >
                    APPOINTMENTS
                  </Nav.Link>
                  <Nav.Link
                    className="text-navbar items-navbar"
                    href="/profile"
                  >
                    {rdxCredentials.data.username}
                  </Nav.Link>
                  <div onClick={logOutMe}>
                    <Nav.Link className="text-navbar items-navbar" href="/">
                      LOG OUT
                    </Nav.Link>
                  </div>
                </>
              )
            ) : (
              <>
                <Nav.Link className="text-navbar items-navbar" href="/login">
                  LOGIN
                </Nav.Link>
                <Nav.Link className="text-navbar items-navbar" href="/workers">
                  WORKERS
                </Nav.Link>
                <Nav.Link className="text-navbar items-navbar" href="/register">
                  REGISTER
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
