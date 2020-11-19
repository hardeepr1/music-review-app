const jwt = require('jsonwebtoken');

function checkAuthentication(req, res, next) {
    let token = req.headers['authorization'];

    console.log(token);
    if (token) {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        jwt.verify(token, "secret", (err, decodedToken) => {
            console.log(decodedToken);
            if (err) {
                return res.json({
                    success: false,
                    message: 'Invalid token'
                });
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        })
    } else {
        console.log("una");
        return res.status(401).send('missing authorization header');
    }
}

module.exports = {
    checkAuthentication: checkAuthentication
}