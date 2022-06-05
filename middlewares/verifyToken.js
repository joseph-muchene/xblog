const jwt = require("jsonwebtoken");

 function verifyToken(req, res) {
  // check if header contain token

  const authToken = req.header.token;

  if (authToken) {
    const splitToken = authToken.split(" ")[1];

    // verify the token

    jwt.verify(splitToken, process.env.JWTSECRET, (err, user) => {
      if (err || !user) {
        return res.status(400).json("token is invalid");
      } else {
        req.user = user;

        next();
      }
    });
  } else {
    return res.status(402).json("you are not authenticated");
  }
};

function verifyTokenAndAuthorization(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.user.id === req.params.userId) next();
  });
}

module.exports = {
  verifyTokenAndAuthorization,

};
