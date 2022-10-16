const express = require('express');
const CountryController = require('../controller/CountryController');

//import express router module
const countryrouter = express.Router();

countryrouter.post('/',CountryController.createCountry);
countryrouter.get('/getallcountries',CountryController.getAllCountries);
countryrouter.get('/getcountry/:countryname',CountryController.findCountryByName);
countryrouter.delete('/deletecountry/:countryname',CountryController.deleteCountryByName);

module.exports = countryrouter;