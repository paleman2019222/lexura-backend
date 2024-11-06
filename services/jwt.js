'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');


exports.createToken = (user)=>{
    let secretKey = process.env.SECRET_KEY;
    var payload = {
        sub: user._id, 
        name: user.first_name, 
        lastname: user.last_name,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(8, 'hour').unix() // pasar a 10 mins
    }
    return jwt.encode(payload, secretKey);
} 