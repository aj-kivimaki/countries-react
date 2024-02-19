import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// components
import Search from "./Search";

// react-bootstrap
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";

// mui
import { Typography } from "@mui/material";

// firebase
import { db, auth, logout } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs } from "firebase/firestore";

const Header = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (!user) return;
    getDocs(collection(db, "users")).then((querySnapshot) => {
      const docs = querySnapshot.docs
        .map((doc) => doc.data())
        .filter((doc) => doc.uid === user.uid);
      setUserName(docs[0].name);
    });
  }, [user]);

  return (
    <Container fluid>
      <Row>
        <Navbar bg="light" variant="light">
          <Container className="justify-content-end">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Link to="/">
                  <Button variant="contained">Home</Button>
                </Link>
                <Link to="/countries">
                  <Button variant="contained">Countries</Button>
                </Link>
                <Link to="/favourites">
                  <Button variant="contained">Favourites</Button>
                </Link>
                {!user && (
                  <Link to="/login">
                    <Button variant="contained">Login</Button>
                  </Link>
                )}
                {!user && (
                  <Link to="/register">
                    <Button variant="contained">Register</Button>
                  </Link>
                )}
                {user && (
                  <Button
                    variant="contained"
                    onClick={() => {
                      logout();
                      setUserName("");
                      navigate("/");
                    }}
                  >
                    Logout
                  </Button>
                )}
                {userName && (
                  <p className="user-name">
                    <strong>Hello, {userName}!</strong>
                  </p>
                )}
              </Nav>
            </Navbar.Collapse>
            <Search />
          </Container>
        </Navbar>
      </Row>
    </Container>
  );
};

export default Header;
