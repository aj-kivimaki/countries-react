import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../store/countriesSlice";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import {
  addFavourite,
  clearFavourites,
  removeFavourite,
} from "../store/favouritesSlice";
import { getFavouritesFromSource } from "../auth/firebase";
import { Button } from "@mui/material";

const Favourites = () => {
  const dispatch = useDispatch();

  const favourites = useSelector((state) => state.favourites.favourites);
  let countriesList = useSelector((state) => state.countries.countries);

  if (favourites.length > 0) {
    countriesList = countriesList.filter((country) =>
      favourites.includes(country.name.common)
    );
  } else {
    countriesList = [];
  }

  useEffect(() => {
    dispatch(initializeCountries());
    dispatch(getFavouritesFromSource());
  }, [dispatch]);

  return (
    <Container fluid>
      <button
        className="mt-4 btn btn-primary btn-sm btn-danger"
        onClick={() => dispatch(clearFavourites())}
      >
        Remove all favourites
      </button>
      <Row xs={1} sm={1} md={2} lg={3} className="g-3">
        {countriesList.map((country) => (
          <Col key={country.name.official} className="mt-5">
            <Card className="h-100 p-1">
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
                />
              )}
              <Card.Img
                variant="top"
                className="rounded h-50"
                src={country.flags.svg}
                style={{
                  objectFit: "cover",
                  minHeight: "200px",
                  maxHeight: "200px",
                }}
              />
              <Card.Body className="d-flex flex-column">
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

export default Favourites;
