const jwt = require("jsonwebtoken");
const config = require("../App/config");

function verifyToken (req,res,next) {
    const token = req.body?.token || req.query?.token || req.headers?.["x-access-token"];
    if (!token) {
        return res.status(403).send("token szükséges a hozzáféréshez");
    }

    try {
        const decodedToken = jwt.verify(token,config.TokenKey);
        console.log(decodedToken);
        
        req.user = decodedToken; 

    } catch(e) {
            return res.status(401).send("Hibás token");
    }
    return next();
}

module.exports = verifyToken