const jwt = require("jsonwebtoken");

const requireJwtAuth = (req, res, next) => {
  const token = req.cookies["jwtToken"];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = decoded;
    next();
  });
};

module.exports = requireJwtAuth;
