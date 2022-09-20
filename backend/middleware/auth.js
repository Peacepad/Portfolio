const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.header("token");
        if (!token) return res.status(403).send({message:"Access denied."});

        const decoded = jwt.verify(token, process.env.TOKEN);
        req.user = decoded;

        next();
    } catch (error) {
        res.status(400).send("Invalid token");
    }
};