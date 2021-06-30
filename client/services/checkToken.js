const jwt = require('jsonwebtoken');
const config = require('../configs/config.json');

module.exports = (req, res, next) => {
    try {
        let header = req.headers['authorization'];
        console.log(header);
        if (typeof header !== 'undefined') {
            let bearer = header.split(':');
            const { data } = jwt.verify(bearer[1], config.TOKEN_SECRET);
            req.id = data;
            
            next()
        }
    } catch (error) {

    }
}