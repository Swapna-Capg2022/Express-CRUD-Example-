var CountryModel = require('../model/country');

//save country in to mongo db
exports.createCountry = async (req, res) => {
    if (!req.body.capital && !req.body.countryName && !req.body.countryLanguage) {
        res.status(400).send({ message: "Country data cannot be empty!!!!" });
    }
    const country = new CountryModel({
        capital: req.body.capital,
        countryName: req.body.countryName,
        countryLanguage: req.body.countryLanguage
    });

    await country.save().then(data => {
        res.send({
            message: "Country Saved Successfully"
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
                || "Some error occured while creating Country"
        });
    });
};//create country close

//Retrieve all countries from the database
exports.getAllCountries = async (req, res) => {
    try {

        const countries = await CountryModel.find();
        res.status(200).json(countries);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//retrieve country by name
exports.findCountryByName = async (req, res) => {

    try {
        const country = await CountryModel.findOne({ 'countryName': req.params.countryname });
        res.status(200).json(country);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//delete a country with the specific country Name
exports.deleteCountryByName = async (req, res) => {

    try {
        await CountryModel.findOneAndRemove({ 'countryName': req.params.countryname })
            .then(data => {
                if(!data){
                    res.status(404).send({ message: 'country not found' });
                }else{
                    res.send({
                        message : "Country Deleted Successfully!!!"
                    })
                }
            });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}