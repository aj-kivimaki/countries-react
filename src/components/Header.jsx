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
        <Navbar className="bg-warning">
          <Container className="justify-content-end">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="btn-group">
                <Link className="btn btn-outline-dark" to="/">
                  Home
                </Link>
                <Link className="btn btn-outline-dark" to="/countries">
                  Countries
                </Link>
                <Link className="btn btn-outline-dark" to="/favourites">
                  Favourites
                </Link>
                {!user && (
                  <Link className="btn btn-outline-dark" to="/login">
                    Login
                  </Link>
                )}
                {!user && (
                  <Link className="btn btn-outline-dark" to="/register">
                    Register
                  </Link>
                )}
                {user && (
                  <button
                    variant="contained"
                    className="btn btn-outline-dark"
                    onClick={() => {
                      logout();
                      setUserName("");
                      navigate("/");
                    }}
                  >
                    Logout
                  </button>
                )}
              </Nav>
            </Navbar.Collapse>
            <Search />
            {userName && (
              <p className="user-name ps-2">
                <strong>Hello, {userName}!</strong>
              </p>
            )}
          </Container>
        </Navbar>
      </Row>
    </Container>
  );
};

export default Header;
