import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const CountriesSingle = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const country = location.state;

  const countryName = country.name.common;
  const capital = country.capital[0];

  return (
    <Container>
      <div className="countries-single">
        <div className="card">
          <img src="url" alt="" />
          <div className="info">
            <h2>{countryName}</h2>
            <h3>{capital}</h3>
            <p>
              {`Right now it's ${"degrees"} in ${capital} and ${"weather condition"}`}
            </p>
          </div>
        </div>
        <button onClick={() => navigate("/countries")}>
          Back to Countries
        </button>
      </div>
    </Container>
  );
};

export default CountriesSingle;
