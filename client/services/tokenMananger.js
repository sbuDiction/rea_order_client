const jwt = require('jsonwebtoken');
const config = require('../configs/config.json');

module.exports = () => {

    const generateAccessToken = (id) => jwt.sign({
        data: id
    }, config.TOKEN_SECRET, { expiresIn: config.TOKEN_LIFE });


    const authenticateToken = (token) => jwt.verify(token, config.TOKEN_SECRET);


    return {
        access: generateAccessToken,
        verifyToken: authenticateToken
    }
}