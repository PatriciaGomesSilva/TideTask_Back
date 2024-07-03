const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).send({ error: 'No token provided' });
        }

        const [, token] = authHeader.split(' ');

        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err) return res.status(401).send({ error: 'Token invalid' });

            req.userId = decoded.id;
            req.userRole = decoded.role;

            if (roles.length && !roles.includes(req.userRole)) {
                return res.status(403).send({ error: 'Forbidden' });
            }

            return next();
        });
    };
};
