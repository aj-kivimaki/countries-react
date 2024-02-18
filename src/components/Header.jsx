import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import { logout } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/firebase";

const Header = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

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
                      navigate("/");
                    }}
                  >
                    Logout
                  </Button>
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
