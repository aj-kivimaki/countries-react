import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button, Container, Image, Col, Spinner, Row } from "react-bootstrap";

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const CountriesSingle = () => {
  const [weather, setWeather] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const country = location.state;
  const countryName = country.name.common;
  const capital = country.capital[0];

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${WEATHER_API_KEY}`
      )
      .catch((error) => {
        console.log(error);
        setError(true);
      })
      .then((res) => {
        setWeather(res.data);
        setLoading(false);
        setError(false);
      });
  }, [capital]);

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
    <Container className="countries-single p-4">
      <div className="card">
        <Container className="info" p={4}>
          <h2 className="display-3">{countryName}</h2>
          <h3 className="display-6">{capital}</h3>
          {!error && weather && (
            <Container p={4}>
              <p className="lead">
                Right now it is <strong>{weather.main.temp.toFixed(1)}</strong>{" "}
                degrees in {capital} and {weather.weather[0].description}.
              </p>
              <Image
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].icon}
              />
            </Container>
          )}
        </Container>
      </div>
      <Row>
        <Col>
          <button
            className="btn btn-warning mt-4"
            onClick={() => navigate("/countries")}
          >
            Back to Countries
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default CountriesSingle;
