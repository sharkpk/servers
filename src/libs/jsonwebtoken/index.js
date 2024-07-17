require("dotenv").config();
var jwt = require("jsonwebtoken");

// Access environment variables
const SECRET_KEY = process.env.SECRET_KEY;
const DEFAULT_TOKEN_EXPIRATION_TIME = process.env.DEFAULT_TOKEN_EXPIRATION_TIME;
const convertTimeInDays = (time) => time * 1000 * 60 * 60 * 24;

const create_jwt_token = ({ data, time = null }) => {
  let expirationTime = DEFAULT_TOKEN_EXPIRATION_TIME;
  if (typeof time === "number") {
    expirationTime = convertTimeInDays(time);
  }
  return jwt.sign(
    {
      data,
    },
    SECRET_KEY,
    { expiresIn: expirationTime }
  );
};

const verify_jwt_token = ({ data }) =>
  jwt.verify(data, SECRET_KEY, function (_, decoded) {
    return decoded;
  });

module.exports = { create_jwt_token, verify_jwt_token };
