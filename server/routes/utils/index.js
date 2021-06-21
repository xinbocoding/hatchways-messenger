
const setCookies = (res, token) => {
  res.cookie("messenger-token", token, {
    maxAge: 86400 * 1000,
    httpOnly: true,
    secure: true,
  });
};

module.exports = { setCookies };
