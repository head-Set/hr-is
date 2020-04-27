var jwt = require('jsonwebtoken');
async function verifyToken(req, res, next) {
    var token = await req.headers['authorization'];
    if (!token)
        return res.status(403).json({
            status: 400,
            message: "No Token Bitch",
        });
    await jwt.verify(token, process.env.MYSECRET, function (err, decoded) {
        if (err) {
            return res.status(500).json({
                auth: false,
                message: 'Failed to authenticate token.'
            })
        }
        req.userId = decoded.id;
        next();
    });

}

module.exports = verifyToken;