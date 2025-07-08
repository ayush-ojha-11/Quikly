import express from "express";
import { Country, State, City } from "country-state-city";

const router = express.Router();

// Get all countries
router.get("/countries", (req, res) => {
  const countries = Country.getAllCountries();
  res.json(countries);
});

// Get states of a country
router.get("/states/:countryCode", (req, res) => {
  const { countryCode } = req.params;
  const states = State.getStatesOfCountry(countryCode);
  res.json(states);
});

// Get cities of a state
router.get("/cities/:countryCode/:stateCode", (req, res) => {
  const { countryCode, stateCode } = req.params;
  const cities = City.getCitiesOfState(countryCode, stateCode);
  res.json(cities);
});

export default router;
