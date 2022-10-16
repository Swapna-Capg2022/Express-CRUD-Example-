var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    capital :{
        type:String,
        required :true,
        unique:true
    },
    countryName : {
        type : String,
        default : ''
    },
    countryLanguage : {
        type : String,
        default : ''
    }
});

//convert or declare above schema as model
var country = new mongoose.model('Country',schema);

module.exports = country;