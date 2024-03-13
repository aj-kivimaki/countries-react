import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../store/countriesSlice";
import { addFavourite, removeFavourite } from "../store/favouritesSlice";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Spinner } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/firebase";
import { getFavouritesFromSource } from "../auth/firebase";

const Countries = () => {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

  const countries = useSelector((state) => state.countries.countries);
  const favourites = useSelector((state) => state.favourites.favourites);
  const loading = useSelector((state) => state.countries.isLoading);
  const searchTerm = useSelector((state) => state.searchTerm.searchTerm);

  useEffect(() => {
    dispatch(initializeCountries());
    dispatch(getFavouritesFromSource());
  }, [dispatch]);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Col className="text-center m-5">
        <Spinner
          animation="border"
          role="status"
          className="center"
          variant="info"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    );
  }

  return (
    <Container fluid className="p-5">
      <Row xs={1} sm={1} md={2} lg={3} className="g-4">
        {filteredCountries.map((country) => (
          <Col key={country.name.official}>
            <Card className="h-100 p-1 ">
              {favourites.some(
                (favourite) => favourite === country.name?.common
              ) ? (
                <FavoriteIcon
                  onClick={() => dispatch(removeFavourite(country.name.common))}
                  className="m-2 text-danger"
                />
              ) : (
                <FavoriteBorderIcon
                  onClick={() => dispatch(addFavourite(country.name.common))}
                  className="m-2"
                />
              )}
              <Link to={`/countries/${country.name.common}`} state={country}>
                <Card.Img
                  variant="top"
                  src={country.flags.svg}
                  style={{
                    objectFit: "cover",
                    minHeight: "200px",
                    maxHeight: "200px",
                  }}
                />
              </Link>
              <Card.Body className="d-flex flex-column ">
                <Card.Title>{country.name.common}</Card.Title>
                <Card.Subtitle className="border-start border-warning border-2 ps-2 mb-5 text-muted">
                  <small>{country.name.official}</small>
                </Card.Subtitle>
                <ListGroup
                  variant="flush"
                  className="flex-grow-1 justify-content-end"
                >
                  <ListGroup.Item>
                    <i className="bi bi-translate me-2"></i>
                    {Object.values(country.languages ?? {}).join(", ")}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <i className="bi bi-cash-coin me-2"></i>
                    {Object.values(country.currencies || {})
                      .map((currency) => currency.name)
                      .join(", ")}
                  </ListGroup.Item>
                  <ListGroup.Item className="text-end fw-bold">
                    {country.population.toLocaleString()}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Countries;
