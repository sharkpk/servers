const { get_session_by_user_id } = require("../DAL/session");
const status_code_list = require("../utilities/status_code");
const { verify_jwt_token } = require("../libs/jsonwebtoken");

const authenticate = async (req, res, next) => {
  const token = req.header("x-sh-auth");
  if (!token) {
    res.status(401).send(status_code_list[401]);
  } else {
    try {
      const decoded = verify_jwt_token({ data: token });

      if (decoded?.data?.user?._id) {
        authorized = true;
        const is_sssion = await get_session_by_user_id(
          decoded?.data?.user?._id
        );
        if (!is_sssion) {
          return res.status(401).send({ message: status_code_list[401] });
        }
        req.user = decoded?.data;
        next();
      } else {
        res.status(401).json({ message: status_code_list[401] });
      }
    } catch (error) {
      res.status(400).send({ status: 400, message: error.message });
    }
  }
};

module.exports = { authenticate };
