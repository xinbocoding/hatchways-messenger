const jwt = require("jsonwebtoken");

const setCookies = (res, token) => {
  res.cookie("token", token, {
    maxAge: 86400 * 1000,
    httpOnly: true,
    secure: true,
  });
};

module.exports = { setCookies };
